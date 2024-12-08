const sq = require('../../config/connection.js')
const titik_area_banjir = require('./model.js')
const { QueryTypes, Op } = require('sequelize')
const { v4: uuid_v4 } = require('uuid')

class AreaBanjir{
  static async read(req, res, next){
    try {
      const { jumlah, halaman, id_titik_area_banjir, lat_titik_area_banjir, lng_titik_area_banjir, urutan_titik_area_banjir, id_area_banjir } = req.body

      // filter
      let isi = ''
      if(id_titik_area_banjir) isi += ' and ab.id_titik_area_banjir = :id_titik_area_banjir '
      if(id_area_banjir ) isi += ' and ab.id_area_banjir = :id_area_banjir '
      if(lat_titik_area_banjir) isi += ' and ab.lat_titik_area_banjir = :lat_titik_area_banjir '
      if(lng_titik_area_banjir) isi += ' and ab.lng_titik_area_banjir = :lng_titik_area_banjir '
      if(urutan_titik_area_banjir) isi += ' and ab.urutan_titik_area_banjir = :urutan_titik_area_banjir '

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
        from titik_area_banjir ab
        inner join titik_area_banjir tab on tab.id_area_banjir = ab.id_area_banjir
        where ab.deleted_at is null ${isi}
        order by ab.updated_at desc ${isi2}
      `,{ replacements: { ...req.body, nama_titik_area_banjir: `%${nama_titik_area_banjir}%` }, type: QueryTypes.SELECT }) // filter dengan like harus dimodifikasi
      if(isi2){
        // query pagination untuk mendapatkan count
        let count = await sq.query(`
          select count(*) as count 
          from titik_area_banjir ab
          inner join titik_area_banjir tab on tab.id_area_banjir = ab.id_area_banjir
          where ab.deleted_at is null
          ${isi} 
        `,{ replacements: { ...req.body, nama_titik_area_banjir: `%${nama_titik_area_banjir}%` }, type: QueryTypes.SELECT }) // filter dengan like harus dimodifikasi
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
      const {lat_titik_area_banjir, lng_titik_area_banjir, urutan_titik_area_banjir, id_area_banjir} = req.body
      let result = await titik_area_banjir.create({id_titik_area_banjir: uuid_v4(), lat_titik_area_banjir, lng_titik_area_banjir, urutan_titik_area_banjir, id_area_banjir })
      next([200, 'success', result])
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async update(req, res, next){
    try {
      let {id_titik_area_banjir, lat_titik_area_banjir, lng_titik_area_banjir, urutan_titik_area_banjir, id_area_banjir} = req.body
      if(id_titik_area_banjir){
        let result = await titik_area_banjir.update({lat_titik_area_banjir, lng_titik_area_banjir, urutan_titik_area_banjir, id_area_banjir}, {where: {id_titik_area_banjir}})
        next(true)
      }else{
        next([500, 'Titik area banjir tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async delete(req, res, next){
    try {
      const {id_titik_area_banjir} = req.body
      if(id_titik_area_banjir){
        let result = await titik_area_banjir.destroy({where: {id_titik_area_banjir}})
        next(true)
      }else{
        next([500, 'Titik area banjir tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
}

module.exports = AreaBanjir