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
      const {tanggal_waktu, banjir, column} = req.body
      if(tanggal_waktu){
        // filter
        let isi = ''
        if(banjir !== null) isi += ' and banjir = :banjir '
        // query
        let result = await sq.query(`
          select ${column ? column.join(', ') : '*'} from rute_koordinat_banjir  
          where (tanggal_waktu = :tanggal_waktu OR tanggal_waktu is null) ${isi}
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

        const isBanjir = (area, curah_hujan) => {
          if(!area || !curah_hujan) return false
          else if(area[1] === 1 && curah_hujan > 10) return true
          else if(area[1] === 2 && curah_hujan > 20) return true
          else if(area[1] === 3 && curah_hujan > 30) return true
          return false
        }

        listKoordinatBanjir.push({
          id_rute_koordinat_banjir: uuid_v4(),
          banjir: isBanjir(area, koordinat.curah_hujan),
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
        if(a % 5000 == 0){
          await m_rute_koordinat_banjir.bulkCreate(listKoordinatBanjir)
          listKoordinatBanjir = []
          console.log(a)
        }
      }
      await m_rute_koordinat_banjir.bulkCreate(listKoordinatBanjir)
      next(true)
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async setBanjirJSON(req, res, next){
    try {
      // get data
      let resKoordinat = await sq.query(`select * from rute_koordinat_banjir rkb order by rkb.id_rute_jalur, rkb.urutan asc`,{ type: QueryTypes.SELECT })

      // Menulis data JSON ke file
      const rutes = []
      for (let a = 0; a < resKoordinat.length; a++) {
        const jalur = resKoordinat[a];
        let index = rutes.findIndex(x => x.tanggal_waktu === jalur.tanggal_waktu)
        if(index == -1){
          index = rutes.length
          rutes.push({
            tanggal_waktu: jalur.tanggal_waktu,
            data: {},
          })
        }
        if(!rutes[index].data[jalur.id_rute_jalur]) rutes[index].data[jalur.id_rute_jalur] = []
        rutes[index].data[jalur.id_rute_jalur].push({
          banjir: jalur.banjir,
          lat_rute_koordinat: jalur.lat_rute_koordinat,
          lng_rute_koordinat: jalur.lng_rute_koordinat,
          satu_arah: jalur.satu_arah,
          id_rute_jalur: jalur.id_rute_jalur,
          id_rute_koordinat: jalur.id_rute_koordinat,
        })
      }
      for (let i = 0; i < rutes.length; i++) {
        const rute = rutes[i];
        console.log(rute.tanggal_waktu)
        fs.writeFileSync(`json/cuaca/${moment(rute.tanggal_waktu).format('YYYY-MM-DD HH-mm')}.json`, JSON.stringify(rute.data, null, 2), 'utf8');
      }
      next(true)
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
}

module.exports = RuteJalurKoordinat