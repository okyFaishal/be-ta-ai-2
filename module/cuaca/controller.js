const sq = require('../../config/connection.js')
const m_cuaca = require('./model.js')
const { QueryTypes, Op } = require('sequelize')
const { v4: uuid_v4 } = require('uuid')
const Axios = require('axios')

class Cuaca{
  static async read(req, res, next){
    try {
      const { jumlah, halaman, tanggal_waktu, kondisi_cuaca, curah_hujan, kode_full_wilayah } = req.body

      // filter
      let isi = ''
      if(tanggal_waktu) isi += ' and d.tanggal_waktu = :tanggal_waktu '
      if(kondisi_cuaca) isi += ' and d.kondisi_cuaca = :kondisi_cuaca '
      if(curah_hujan) isi += ' and d.curah_hujan = :curah_hujan '
      if(kode_full_wilayah) isi += ' and d.kode_full_wilayah = :kode_full_wilayah '

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
        from cuaca d
        where true ${isi}
        order by d.tanggal_waktu desc ${isi2}
      `,{ replacements: { ...req.body }, type: QueryTypes.SELECT }) // filter dengan like harus dimodifikasi
      if(isi2){
        // query pagination untuk mendapatkan count
        let count = await sq.query(`
          select count(*) as count 
          from cuaca d
          where true
          ${isi} 
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
      const {tanggal_waktu, kondisi_cuaca, curah_hujan, kode_full_wilayah} = req.body
      let result = await m_cuaca.create({id_cuaca: uuid_v4(), tanggal_waktu, kondisi_cuaca, curah_hujan, kode_full_wilayah })
      next([200, 'success', result])
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async update(req, res, next){
    try {
      let {id_cuaca, tanggal_waktu, kondisi_cuaca, curah_hujan, kode_full_wilayah} = req.body
      if(id_cuaca){
        let result = await m_cuaca.update({tanggal_waktu, kondisi_cuaca, curah_hujan, kode_full_wilayah}, {where: {id_cuaca}})
        next(true)
      }else{
        next([500, 'Cuaca tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async delete(req, res, next){
    try {
      const {id_cuaca} = req.body
      if(id_cuaca){
        let result = await m_cuaca.destroy({where: {id_cuaca}})
        next(true)
      }else{
        next([500, 'Cuaca tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }

  static async listTanggal(req, res, next){
    try {
      let result = await sq.query(`select DISTINCT(c.tanggal_waktu) FROM cuaca c`,{ type: QueryTypes.SELECT })
      next([200, 'success', {data: result}])
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async setCuaca(req, res, next) {
    try {
      await m_cuaca.destroy({where: {}})
      // Ambil kode wilayah
      const listKoordinat = await sq.query(
        `SELECT DISTINCT(rk.kode_full_wilayah) FROM rute_koordinat rk WHERE rk.kode_full_wilayah IS NOT NULL`,
        { type: QueryTypes.SELECT }
      );
      // let index = 0
      let perulangan = 0
      let jumlah = 50
      let stop = false
      while (listKoordinat.length > perulangan * jumlah) {
        if(stop){
          break
        }
        // stop = true
        let list = listKoordinat.slice(perulangan * jumlah, (perulangan + 1) * jumlah)
        console.log(list.length, ' - ', perulangan * jumlah, ' - ', (perulangan + 1) * jumlah)
        perulangan++
        const promises = list.map(async (koordinat, i) => {
          try {
            let listCuaca = []
            // Ambil cuaca berdasarkan kode wilayah
            // console.log(i)
            const { data } = await Axios.get(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${koordinat.kode_full_wilayah}`);
            // console.log(i)
            const cuaca = data.data[0].cuaca
            for (let i = 0; i < cuaca.length; i++) {
              const cuacaHari = cuaca[i];
              for (let u = 0; u < cuacaHari.length; u++) {
                const cuacaJam = cuacaHari[u];
                listCuaca.push({
                  id_cuaca: uuid_v4(),
                  tanggal_waktu: cuacaJam.datetime,
                  kondisi_cuaca: cuacaJam.weather_desc,
                  curah_hujan: cuacaJam.tp,
                  kode_full_wilayah: koordinat.kode_full_wilayah,
                })
                if(cuacaJam.weather_desc == '95'){
                  console.log(cuacaJam)
                }
              }
            }
    
            // Update koordinat jika wilayah ditemukan
            if (listCuaca.length) {
              await m_cuaca.bulkCreate(listCuaca, { updateOnDuplicate: ['tanggal_waktu', 'kode_full_wilayah'] });
              // console.log('listCuaca', listCuaca)
            }else{
              console.log('tidak ditemukan cuaca', listCuaca)
              // stop = true
            }
          } catch (err) {
            console.error(`Error processing koordinat ID ${koordinat.kode_full_wilayah}:`, err);
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
}

module.exports = Cuaca