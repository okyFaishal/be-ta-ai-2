const sq = require('../../config/connection.js')
const m_rute_koordinat_banjir = require('./model.js')
const { QueryTypes, Op } = require('sequelize')
const { v4: uuid_v4 } = require('uuid')
const turf = require('@turf/turf');
const fs = require('fs');
const moment = require('moment')

class RuteJalurKoordinat{
  static async read(req, res, next){
    try {
      const { jumlah, halaman, banjir, kondisi_cuaca, curah_hujan, lat_rute_koordinat, lng_rute_koordinat, satu_arah, akses_motor, type_jalan, urutan, id_cuaca, id_rute_jalur, id_rute_koordinat, id_area_banjir } = req.body

      // filter
      let isi = ''
      if(banjir) isi += ' and d.banjir = :banjir '
      if(kondisi_cuaca) isi += ' and d.kondisi_cuaca = :kondisi_cuaca '
      if(curah_hujan) isi += ' and d.curah_hujan = :curah_hujan '
      if(lat_rute_koordinat) isi += ' and d.lat_rute_koordinat = :lat_rute_koordinat '
      if(lng_rute_koordinat) isi += ' and d.lng_rute_koordinat = :lng_rute_koordinat '
      if(satu_arah) isi += ' and d.satu_arah = :satu_arah '
      if(akses_motor) isi += ' and d.akses_motor = :akses_motor '
      if(type_jalan) isi += ' and d.type_jalan = :type_jalan '
      if(urutan) isi += ' and d.urutan = :urutan '
      if(id_cuaca) isi += ' and d.id_cuaca = :id_cuaca '
      if(id_rute_jalur) isi += ' and d.id_rute_jalur = :id_rute_jalur '
      if(id_rute_koordinat) isi += ' and d.id_rute_koordinat = :id_rute_koordinat '
      if(id_area_banjir) isi += ' and d.id_area_banjir = :id_area_banjir '

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
        where true ${isi}
        order by d.urutan desc ${isi2}
      `,{ replacements: { ...req.body }, type: QueryTypes.SELECT }) // filter dengan like harus dimodifikasi
      if(isi2){
        // query pagination untuk mendapatkan count
        let count = await sq.query(`
          select count(*) as count 
          from rute_koordinat d
          where true  ${isi} 
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
      const {banjir, kondisi_cuaca, curah_hujan, lat_rute_koordinat, lng_rute_koordinat, satu_arah, akses_motor, type_jalan, urutan, id_cuaca, id_rute_jalur, id_rute_koordinat, id_area_banjir} = req.body
      let result = await m_rute_koordinat_banjir.create({id_rute_koordinat_banjir: uuid_v4(), banjir, kondisi_cuaca, curah_hujan, lat_rute_koordinat, lng_rute_koordinat, satu_arah, akses_motor, type_jalan, urutan, id_cuaca, id_rute_jalur, id_rute_koordinat, id_area_banjir })
      next([200, 'success', result])
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async update(req, res, next){
    try {
      let {id_rute_koordinat_banjir, banjir, kondisi_cuaca, curah_hujan, lat_rute_koordinat, lng_rute_koordinat, satu_arah, akses_motor, type_jalan, urutan, id_cuaca, id_rute_jalur, id_rute_koordinat, id_area_banjir} = req.body
      if(id_rute_koordinat_banjir){
        let result = await m_rute_koordinat_banjir.update({banjir, kondisi_cuaca, curah_hujan, lat_rute_koordinat, lng_rute_koordinat, satu_arah, akses_motor, type_jalan, urutan, id_cuaca, id_rute_jalur, id_rute_koordinat, id_area_banjir}, {where: {id_rute_koordinat_banjir}})
        next(true)
      }else{
        next([500, 'Rute jalur koordinat tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async delete(req, res, next){
    try {
      const {id_rute_koordinat_banjir} = req.body
      if(id_rute_koordinat_banjir){
        let result = await m_rute_koordinat_banjir.destroy({where: {id_rute_koordinat_banjir}})
        next(true)
      }else{
        next([500, 'Rute jalur koordinat tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }

  static async listBanjir(req, res, next){
    try {
      const {tanggal_waktu, column} = req.body
      if(tanggal_waktu){
        let result = await sq.query(`
          select ${column ? column.join(', ') : '*'} from rute_koordinat_banjir  
          where tanggal_waktu = :tanggal_waktu OR tanggal_waktu is null
          order by id_rute_jalur, urutan asc
        `,{ replacements: { ...req.body }, type: QueryTypes.SELECT })
        next([200, 'success', {data: result}])
      }else{
        next([500, 'Masukkan tanggal'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async setBanjir(req, res, next){
    try {      
      let resArea = await sq.query(`select * from area_banjir ab inner join titik_area_banjir tab on tab.id_area_banjir = ab.id_area_banjir order by tab.urutan_titik_area_banjir `,{ type: QueryTypes.SELECT })
      let resKoordinat = await sq.query(`select * from rute_koordinat rk inner join rute_jalur_koordinat rjk on rjk.id_rute_koordinat = rk.id_rute_koordinat inner join rute_jalur rj on rj.id_rute_jalur = rjk.id_rute_jalur left join cuaca c on c.kode_full_wilayah = rk.kode_full_wilayah order by rjk.id_rute_jalur, rjk.urutan asc`,{ type: QueryTypes.SELECT })
      await m_rute_koordinat_banjir.destroy({where: {}})

      // grouping area
      const listArea = {}
      resArea.forEach(area => {
        const key = `${area.id_area_banjir}-----${area.level_area_banjir}`
        if(!listArea[key]) listArea[key] = []
        listArea[key].push([area.lat_titik_area_banjir, area.lng_titik_area_banjir])
      });

      // perulangan semua titik koordinat dengan kondisi cuaca
      let listKoordinatBanjirBackup = []
      let listKoordinatBanjir = []
      for (let a = 0; a < resKoordinat.length; a++) {
        const koordinat = resKoordinat[a];
        let area = null
        for (const key in listArea) {
          if (Object.prototype.hasOwnProperty.call(listArea, key)) {
            const item = listArea[key];
            // Mengecek apakah titik berada di dalam poligon
            const titikKoordinat = turf.point([koordinat.lat_rute_koordinat, koordinat.lng_rute_koordinat]); 
            const areaPolygon = turf.polygon([[...item, [item[0][0], item[0][1]]]]);
            if (turf.booleanPointInPolygon(titikKoordinat, areaPolygon)) {
              if(!area || area[1] > key.split('-----')[1]){
                area = key.split('-----')
              }
            }
          }
        }
        // if(!koordinat.kondisi_cuaca) {console.log('koordinat', koordinat); break;}
        listKoordinatBanjir.push({
          id_rute_koordinat_banjir: uuid_v4(),
          banjir: area && koordinat.curah_hujan >= 20 ? true : false,
          kondisi_cuaca: koordinat.kondisi_cuaca,
          curah_hujan: koordinat.curah_hujan,
          tanggal_waktu: koordinat.tanggal_waktu,
          lat_rute_koordinat: koordinat.lat_rute_koordinat,
          lng_rute_koordinat: koordinat.lng_rute_koordinat,
          satu_arah: koordinat.satu_arah,
          akses_motor: koordinat.akses_motor,
          type_jalan: koordinat.type_jalan,
          urutan: koordinat.urutan,
          id_cuaca: koordinat.id_cuaca,
          id_rute_jalur: koordinat.id_rute_jalur,
          id_rute_koordinat: koordinat.id_rute_koordinat,
          id_area_banjir: area ? area[0] : undefined,
        })
        listKoordinatBanjirBackup.push({
          banjir: area && koordinat.curah_hujan >= 20 ? true : false,
          lat_rute_koordinat: koordinat.lat_rute_koordinat,
          lng_rute_koordinat: koordinat.lng_rute_koordinat,
          satu_arah: koordinat.satu_arah,
          id_rute_jalur: koordinat.id_rute_jalur,
          id_rute_koordinat: koordinat.id_rute_koordinat,
          tanggal_waktu: koordinat.tanggal_waktu,
        })
        if(a % 5000 == 0){
          await m_rute_koordinat_banjir.bulkCreate(listKoordinatBanjir)
          listKoordinatBanjir = []
          console.log(a)
        }
      }
      
      // Menulis data JSON ke file
      const rutes = []
      for (let a = 0; a < listKoordinatBanjirBackup.length; a++) {
        const jalur = listKoordinatBanjirBackup[a];
        let index = rutes.findIndex(x => x.tanggal_waktu === jalur.tanggal_waktu)
        if(index == -1){
          index = rutes.length
          rutes.push({
            tanggal_waktu: jalur.tanggal_waktu,
            data: {},
          })
        }
        if(!rutes[index].data[jalur.id_rute_jalur]) rutes[index].data[jalur.id_rute_jalur] = []
        rutes[index].data[jalur.id_rute_jalur].push({...jalur, tanggal_waktu: undefined})
      }
      for (let i = 0; i < rutes.length; i++) {
        const rute = rutes[i];
        console.log(rute.tanggal_waktu)
        // console.log(rute.data)
        fs.writeFileSync(`json/cuaca/${moment(rute.tanggal_waktu).format('YYYY-MM-DD HH-mm')}.json`, JSON.stringify(rute.data, null, 2), 'utf8');
      }
      // console.log('File JSON berhasil dibuat!');

      // for (let i = 0; i < listKoordinatBanjir.length; i+= 5000) {
      //   console.log(i + 5000)
      //   await m_rute_koordinat_banjir.bulkCreate(listKoordinatBanjir.slice(i, i + 5000))
      // }
      next(true)
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
}

module.exports = RuteJalurKoordinat