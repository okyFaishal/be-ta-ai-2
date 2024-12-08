const sq = require('../../config/connection.js')
const m_rute_koordinat = require('./model.js')
const { QueryTypes, Op } = require('sequelize')
const { v4: uuid_v4 } = require('uuid')
const Axios = require('axios')
class RuteKoordinat{
  static async read(req, res, next){
    try {
      const { jumlah, halaman, lat_rute_koordinat, lng_rute_koordinat, akses_motor, kode_full_wilayah } = req.body

      // filter
      let isi = ''
      if(lat_rute_koordinat) isi += ' and d.lat_rute_koordinat = :lat_rute_koordinat '
      if(lng_rute_koordinat) isi += ' and d.lng_rute_koordinat = :lng_rute_koordinat '
      if(akses_motor) isi += ' and d.akses_motor = :akses_motor '
      if(kode_full_wilayah) isi += ' and d.kode_full_wilayah = :kode_full_wilayah '
      if(kode_full_wilayah === null) isi += ' and d.kode_full_wilayah is null '

      // pagination
      let isi2 = ''
      if (halaman && jumlah) {
        req.body.offset = Number.parseInt(halaman) * Number.parseInt(jumlah)
        req.body.jumlah = Number.parseInt(jumlah)
        isi2 += ` limit :jumlah offset :offset`
      }
      
      // query data / list
      let result = await sq.query(`
        select * 
        from rute_koordinat d
        inner join rute_jalur_koordinat rjk on rjk.id_rute_koordinat = d.id_rute_koordinat
        inner join rute_jalur rj on rj.id_rute_jalur = rjk.id_rute_jalur 
        where true ${isi}
        order by rjk.urutan asc ${isi2}
      `,{ replacements: { ...req.body }, type: QueryTypes.SELECT }) // filter dengan like harus dimodifikasi
      if(isi2){
        // query pagination untuk mendapatkan count
        let count = await sq.query(`
          select count(*) as count 
          from rute_koordinat d
          inner join rute_jalur_koordinat rjk on rjk.id_rute_koordinat = d.id_rute_koordinat
          inner join rute_jalur rj on rj.id_rute_jalur = rjk.id_rute_jalur 
          where true ${isi} 
        `,{ replacements: { ...req.body }, type: QueryTypes.SELECT }) // filter dengan like harus dimodifikasi
        next([200, 'success', {data: result, count: count[0].count}])
      }else{
        next([200, 'success', {data: result}])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async create(req, res, next){
    try {
      const {lat_rute_koordinat, lng_rute_koordinat, akses_motor, kode_full_wilayah} = req.body
      let result = await m_rute_koordinat.create({id_rute_koordinat: uuid_v4(), lat_rute_koordinat, lng_rute_koordinat, akses_motor, kode_full_wilayah })
      next([200, 'success', result])
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async update(req, res, next){
    try {
      let {id_rute_koordinat, lat_rute_koordinat, lng_rute_koordinat, akses_motor, kode_full_wilayah} = req.body
      if(id_rute_koordinat){
        let result = await m_rute_koordinat.update({lat_rute_koordinat, lng_rute_koordinat, akses_motor, kode_full_wilayah}, {where: {id_rute_koordinat}})
        next(true)
      }else{
        next([500, 'Rute koordinat tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async delete(req, res, next){
    try {
      const {id_rute_koordinat} = req.body
      if(id_rute_koordinat){
        let result = await m_rute_koordinat.destroy({where: {id_rute_koordinat}})
        next(true)
      }else{
        next([500, 'Rute koordinat tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }

  static async setWilayah(req, res, next) {
    try {
      // Ambil rute koordinat yang belum memiliki kode wilayah
      const listKoordinat = await m_rute_koordinat.findAll({
        where: {
          kode_full_wilayah: {
            [Op.is]: null,
          },
        },
        // limit: 100,
      });
      // let index = 0
      let perulangan = 0
      let jumlah = 10
      let stop = false
      while (listKoordinat.length > perulangan * jumlah) {
        if(stop){
          break
        }
        let list = listKoordinat.slice(perulangan * jumlah, (perulangan + 1) * jumlah)
        console.log(list.length, ' - ', perulangan * jumlah, ' - ', (perulangan + 1) * jumlah)
        perulangan++
        const promises = list.map(async (koordinat, i) => {
          try {
            // Ambil alamat berdasarkan koordinat
            // console.log(i)
            const { data } = await Axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${koordinat.lat_rute_koordinat}&lon=${koordinat.lng_rute_koordinat}&format=json`);
            // console.log(i)
  
            const alamat = {
              kelurahan: data.address.suburb || data.address.village,
              kecamatan: data.address.city_district || data.address.district || data.address.municipality,
              kota: data.address.city || data.address.town || 'Semarang',
              provinsi: data.address.state || 'Jawa Tengah',
            };
    
            // Jika tidak ada kelurahan, abaikan koordinat ini
            if (!alamat.kelurahan) return;
            
            // pembenaran data custom
            if(alamat.kelurahan == 'Pendrikan Lor') alamat.kelurahan = 'Pindrikan Lor'
            if(alamat.kelurahan == 'Pendrikan Kidul') alamat.kelurahan = 'Pindrikan Kidul'
            if(alamat.kelurahan == 'Bendan Duwur') alamat.kelurahan = 'Bendan Dhuwur'
            if(alamat.kecamatan == 'Banyumanik') alamat.kota = 'SEMARANG'
    
            // Bangun query filter berdasarkan alamat
            let filter = '';
            // for (let i = 2; i <= 4; i++) {
              
            // }
            // 'Wonotingal'.split('').map(x=>`[${x}]+`).join('')
            if (alamat.kecamatan) filter += ` AND (w2.nama_wilayah LIKE '%${alamat.kecamatan}%' OR REGEXP_REPLACE(w2.nama_wilayah, '[[:blank:]]', '') like '%${alamat.kecamatan}%' OR w2.nama_wilayah LIKE '%${alamat.kecamatan.replace(/(.)\1+/g, '$1')}%' OR w2.nama_wilayah LIKE '%${alamat.kecamatan.replace(/[B]/i, 'be')}%' OR w2.nama_wilayah LIKE '%${alamat.kecamatan.replace(' ', '')}%' OR w2.nama_wilayah REGEXP '${alamat.kecamatan.split('').map(x=>`[${x}]+`).join('')}') `;
            if (alamat.kota) filter += ` AND (w3.nama_wilayah LIKE '%${alamat.kota}%' OR REGEXP_REPLACE(w3.nama_wilayah, '[[:blank:]]', '') like '%${alamat.kota}%' OR w3.nama_wilayah LIKE '%${alamat.kota.replace(/(.)\1+/g, '$1')}%' OR w3.nama_wilayah LIKE '%${alamat.kota.replace(/[B]/i, 'be')}%' OR w3.nama_wilayah LIKE '%${alamat.kota.replace(' ', '')}%' OR w3.nama_wilayah REGEXP '${alamat.kota.split('').map(x=>`[${x}]+`).join('')}') `;
            if (alamat.provinsi) filter += ` AND (w4.nama_wilayah LIKE '%${alamat.provinsi}%' OR REGEXP_REPLACE(w4.nama_wilayah, '[[:blank:]]', '') like '%${alamat.provinsi}%' OR w4.nama_wilayah LIKE '%${alamat.provinsi.replace(/(.)\1+/g, '$1')}%' OR w4.nama_wilayah LIKE '%${alamat.provinsi.replace(/[B]/i, 'be')}%' OR w4.nama_wilayah LIKE '%${alamat.provinsi.replace(' ', '')}%' OR w4.nama_wilayah REGEXP '${alamat.provinsi.split('').map(x=>`[${x}]+`).join('')}') `;
    
            // Cari wilayah berdasarkan alamat
            const wilayah = await sq.query(
              `
                SELECT w.*
                FROM wilayah w
                INNER JOIN wilayah w2 ON w2.kode_full_wilayah = w.head_wilayah
                INNER JOIN wilayah w3 ON w3.kode_full_wilayah = w2.head_wilayah
                INNER JOIN wilayah w4 ON w4.kode_full_wilayah = w3.head_wilayah
                WHERE (w.nama_wilayah LIKE '%${alamat.kelurahan}%' OR REGEXP_REPLACE(w.nama_wilayah, '[[:blank:]]', '') like '%${alamat.kelurahan}%' OR w.nama_wilayah LIKE '%${alamat.kelurahan.replace(/(.)\1+/g, '$1')}%' OR w.nama_wilayah LIKE '%${alamat.kelurahan.replace(/[B]/i, 'be')}%' OR w.nama_wilayah LIKE '%${alamat.kelurahan.replace(' ', '')}%' OR w.nama_wilayah REGEXP '${alamat.kelurahan.split('').map(x=>`[${x}]+`).join('')}') ${filter}
              `,
              { type: QueryTypes.SELECT }
            );
    
            // Update koordinat jika wilayah ditemukan
            if (wilayah.length) {
              await m_rute_koordinat.update(
                { kode_full_wilayah: wilayah[0].kode_full_wilayah },
                { where: { id_rute_koordinat: koordinat.id_rute_koordinat } }
              );
            }else{
              console.log('alamat', alamat)
              // console.log('query', `
              //   SELECT w.*
              //   FROM wilayah w
              //   INNER JOIN wilayah w2 ON w2.kode_full_wilayah = w.head_wilayah
              //   INNER JOIN wilayah w3 ON w3.kode_full_wilayah = w2.head_wilayah
              //   INNER JOIN wilayah w4 ON w4.kode_full_wilayah = w3.head_wilayah
              //   WHERE (w.nama_wilayah LIKE '%${alamat.kelurahan}%' OR w.nama_wilayah LIKE '%${alamat.kelurahan.replace(' ', '')}%') ${filter}
              // `)
              // stop = true
            }
          } catch (err) {
            console.error(`Error processing koordinat ID ${koordinat.id_rute_koordinat}:`, err);
          }
        })
    
        // Tunggu semua proses selesai
        await Promise.all(promises);
        // await new Promise(resolve => setTimeout(resolve, 3000));
      }
  
      next([200, 'success']);
    } catch (error) {
      console.error('Server error:', error);
      next([500, 'Server error', error]);
    }
  }
  
  static async setWilayahByGoogleMapAPI(req, res, next) {
    try {
      const listKoordinat = await m_rute_koordinat.findAll({
        where: {
          kode_full_wilayah: {
            [Op.is]: null,
          },
        },
      });

      let perulangan = 0;
      let jumlah = 20;
      let stop = false;

      while (listKoordinat.length > perulangan * jumlah) {
        if (stop) break;

        let list = listKoordinat.slice(perulangan * jumlah, (perulangan + 1) * jumlah);
        console.log(list.length, ' - ', perulangan * jumlah, ' - ', (perulangan + 1) * jumlah);
        perulangan++;

        const promises = list.map(async (koordinat, i) => {
          try {
            const GOOGLE_MAPS_API_KEY = 'AIzaSyDOjZ8PRdaBYgdP1HnuzlE3Qd1TQhWI_Kk'
            const { data } = await Axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${koordinat.lat_rute_koordinat},${koordinat.lng_rute_koordinat}&key=${GOOGLE_MAPS_API_KEY}`
            );

            if (data.status !== 'OK' || !data.results.length) return;

            const result = data.results[0];
            const alamatComponents = result.address_components;

            const getComponent = (types) =>
              alamatComponents.find((component) =>
                types.some((type) => component.types.includes(type))
              )?.long_name || null;

            const alamat = {
              kelurahan: getComponent(['administrative_area_level_4']).replace(/kelurahan /i, ''),
              kecamatan: getComponent(['administrative_area_level_3']).replace(/kecamatan /i, ''),
              kota: getComponent(['administrative_area_level_2']).replace(/kota /i, '').replace(/Kabupaten/, 'KAB.'),
              provinsi: getComponent(['administrative_area_level_1']),
            };

            if (!alamat.kelurahan) return;

            // Penyesuaian nama wilayah
            if (alamat.kelurahan === 'Sayung') {alamat.kecamatan = 'Sayung'; alamat.kota = 'KAB. DEMAK';}
            if (alamat.kelurahan === 'Trimulyo') {alamat.kecamatan = 'Guntur'; alamat.kota = 'KAB. DEMAK';}
            if (alamat.kelurahan === 'Bandarjo') {alamat.kecamatan = 'Ungaran Barat'; alamat.kota = 'KAB. SEMARANG';}
            if (alamat.kelurahan === 'Terboyo Wetan') {alamat.kecamatan = 'Genuk'; alamat.kota = 'KOTA SEMARANG';}
            if (alamat.kelurahan === 'Ngaliyan') alamat.kecamatan = 'Ngaliyan';
            if (alamat.kelurahan === 'Ngrembel') alamat.kelurahan = 'Gunungpati';
            if (alamat.kecamatan === 'Pedurungan') alamat.kelurahan = 'KOTA SEMARANG';
            if (alamat.kecamatan === 'Genuk') alamat.kota = 'KOTA SEMARANG';
            if (alamat.kecamatan === 'Boja') alamat.kota = 'KAB. KENDAL';
            if (alamat.kota === 'Semarang Regency') alamat.kota = 'KAB. SEMARANG';
            if (alamat.kota === 'Semarang City') alamat.kota = 'KOTA SEMARANG';
            if (alamat.kota === 'Kendal Regency') alamat.kota = 'KAB. KENDAL';
            if (alamat.provinsi === 'Central Java') alamat.provinsi = 'Jawa Tengah';

            let filter = '';
            if (alamat.kecamatan) filter += ` AND (w2.nama_wilayah LIKE '%${alamat.kecamatan}%' OR REGEXP_REPLACE(w2.nama_wilayah, '[[:blank:]]', '') like '%${alamat.kecamatan}%' OR w2.nama_wilayah LIKE '%${alamat.kecamatan.replace(/(.)\1+/g, '$1')}%' OR w2.nama_wilayah LIKE '%${alamat.kecamatan.replace(/[B]/i, 'be')}%' OR w2.nama_wilayah LIKE '%${alamat.kecamatan.replace(' ', '')}%' OR w2.nama_wilayah REGEXP '${alamat.kecamatan.split('').map(x=>`[${x}]+`).join('')}') `;
            if (alamat.kota) filter += ` AND (w3.nama_wilayah LIKE '%${alamat.kota}%' OR REGEXP_REPLACE(w3.nama_wilayah, '[[:blank:]]', '') like '%${alamat.kota}%' OR w3.nama_wilayah LIKE '%${alamat.kota.replace(/(.)\1+/g, '$1')}%' OR w3.nama_wilayah LIKE '%${alamat.kota.replace(/[B]/i, 'be')}%' OR w3.nama_wilayah LIKE '%${alamat.kota.replace(' ', '')}%' OR w3.nama_wilayah REGEXP '${alamat.kota.split('').map(x=>`[${x}]+`).join('')}') `;
            if (alamat.provinsi) filter += ` AND (w4.nama_wilayah LIKE '%${alamat.provinsi}%' OR REGEXP_REPLACE(w4.nama_wilayah, '[[:blank:]]', '') like '%${alamat.provinsi}%' OR w4.nama_wilayah LIKE '%${alamat.provinsi.replace(/(.)\1+/g, '$1')}%' OR w4.nama_wilayah LIKE '%${alamat.provinsi.replace(/[B]/i, 'be')}%' OR w4.nama_wilayah LIKE '%${alamat.provinsi.replace(' ', '')}%' OR w4.nama_wilayah REGEXP '${alamat.provinsi.split('').map(x=>`[${x}]+`).join('')}') `;

            const wilayah = await sq.query(
              `
                SELECT w.*
                FROM wilayah w
                INNER JOIN wilayah w2 ON w2.kode_full_wilayah = w.head_wilayah
                INNER JOIN wilayah w3 ON w3.kode_full_wilayah = w2.head_wilayah
                INNER JOIN wilayah w4 ON w4.kode_full_wilayah = w3.head_wilayah
                WHERE (w.nama_wilayah LIKE '%${alamat.kelurahan}%' OR REGEXP_REPLACE(w.nama_wilayah, '[[:blank:]]', '') like '%${alamat.kelurahan}%' OR w.nama_wilayah LIKE '%${alamat.kelurahan.replace(/(.)\1+/g, '$1')}%' OR w.nama_wilayah LIKE '%${alamat.kelurahan.replace(/[B]/i, 'be')}%' OR w.nama_wilayah LIKE '%${alamat.kelurahan.replace(' ', '')}%' OR w.nama_wilayah REGEXP '${alamat.kelurahan.split('').map(x=>`[${x}]+`).join('')}') ${filter}
              `,
              { type: QueryTypes.SELECT }
            );

            if (wilayah.length) {
              await m_rute_koordinat.update(
                { kode_full_wilayah: wilayah[0].kode_full_wilayah },
                { where: { id_rute_koordinat: koordinat.id_rute_koordinat } }
              );
            } else {
              console.log('Alamat tidak ditemukan:', alamat);
              // stop = true
            }
          } catch (err) {
            console.error(`Error processing koordinat ID ${koordinat.id_rute_koordinat}:`, err);
          }
        });

        await Promise.all(promises);
      }

      next([200, 'success']);
    } catch (error) {
      console.error('Server error:', error);
      next([500, 'Server error', error]);
    }
  }

  

  // static async setWilayah(req, res, next){
  //   try {
  //     // get rute koordinat 
  //     const listKoordinat = await m_rute_koordinat.findAll({
  //       where: {
  //         kode_full_wilayah: {
  //           [Op.is]: null, 
  //         },
  //       },
  //     });
  //     for (let i = 0; i < listKoordinat.length; i++) {
  //       console.log(i, ' - ', listKoordinat.length)
  //       const koordinat = listKoordinat[i];
  //       // get alamat from koordinat
  //       const res = await Axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${koordinat.lat_rute_koordinat}&lon=${koordinat.lng_rute_koordinat}&format=json`)
  //       console.log(res.data.address)
  //       const alamat = {
  //         kelurahan: res.data.address.suburb || res.data.address.village,
  //         kecamatan: res.data.address.city_district || res.data.address.district || res.data.address.municipality,
  //         kota: res.data.address.city || res.data.address.town,
  //         provinsi: res.data.address.state,
  //       };
  //       if(alamat.kelurahan){ // minimal harus memiliki alamat
  //         let isi = ``
  //         if(alamat.kecamatan)  isi += ` and w2.nama_wilayah LIKE '${alamat.kecamatan}' `
  //         if(alamat.kota)  isi += ` and w3.nama_wilayah LIKE '${alamat.kota}' `
  //         if(alamat.provinsi)  isi += ` and w4.nama_wilayah LIKE '${alamat.provinsi}' `
  //         // get wilayah berdasarkan alamat
  //         const res = await sq.query(`
  //           select w.*
  //           from wilayah w 
  //           inner join wilayah w2 on w2.kode_full_wilayah = w.head_wilayah
  //           inner join wilayah w3 on w3.kode_full_wilayah = w2.head_wilayah
  //           inner join wilayah w4 on w4.kode_full_wilayah = w3.head_wilayah
  //           where w.nama_wilayah LIKE '${alamat.kelurahan}' ${isi}
  //         `,{ type: QueryTypes.SELECT })
  //         if(res.length){
  //           await m_rute_koordinat.update({kode_full_wilayah: res[0].kode_full_wilayah}, {where: {id_rute_koordinat: koordinat.id_rute_koordinat}})
  //         }
  //       }
  //       // break
  //     }
  //     next([200, 'success'])
  //   } catch (error) {
  //     console.log('error >> ', error)
  //     next([500, 'Server error', error])
  //   }
  // }
}

module.exports = RuteKoordinat