const sq = require('../../config/connection.js')
const t_area_banjir = require('./model.js')
const t_titik_area_banjir = require('../titik_area_banjir/model.js')
const { QueryTypes, Op } = require('sequelize')
const { v4: uuid_v4 } = require('uuid')

class AreaBanjir{
  static async read(req, res, next){
    try {
      const { jumlah, halaman, id_area_banjir, nama_area_banjir, level_area_banjir } = req.body

      // filter
      let isi = ''
      if(id_area_banjir) isi += ' and ab.id_area_banjir = :id_area_banjir '
      if(level_area_banjir) isi += ' and ab.level_area_banjir = :level_area_banjir '
      if(nama_area_banjir) isi += ' and ab.nama_area_banjir like :nama_area_banjir '

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
        from area_banjir ab
        where ab.deleted_at is null ${isi}
        order by ab.updated_at desc ${isi2}
      `,{ replacements: { ...req.body, nama_area_banjir: `%${nama_area_banjir}%` }, type: QueryTypes.SELECT }) // filter dengan like harus dimodifikasi
      for (let i = 0; i < result.length; i++) {
        const item = result[i];
        item.list_titik_area_banjir = await t_titik_area_banjir.findAll({where: {id_area_banjir: item.id_area_banjir}, order: [ ['urutan_titik_area_banjir', 'ASC']]})
      }
      if(isi2){
        // query pagination untuk mendapatkan count
        let count = await sq.query(`
          select count(*) as count 
          from area_banjir ab
          where ab.deleted_at is null
          ${isi} 
        `,{ replacements: { ...req.body, nama_area_banjir: `%${nama_area_banjir}%` }, type: QueryTypes.SELECT }) // filter dengan like harus dimodifikasi
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
      const {nama_area_banjir, level_area_banjir} = req.body
      let result = await t_area_banjir.create({id_area_banjir: uuid_v4(), nama_area_banjir, level_area_banjir })
      next([200, 'success', result])
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async createWithTitik(req, res, next){
    try {
      let {nama_area_banjir, level_area_banjir, titik_area_banjir } = req.body
      let result = await t_area_banjir.create({id_area_banjir: uuid_v4(), nama_area_banjir, level_area_banjir })
      titik_area_banjir = titik_area_banjir.map(item => {return{
        ...item,
        id_titik_area_banjir: uuid_v4(),
        id_area_banjir: result.id_area_banjir,
      }})
      console.log("titik_area_banjir", titik_area_banjir)
      await t_titik_area_banjir.bulkCreate(titik_area_banjir)
      next([200, 'success', result])
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async update(req, res, next){
    try {
      let {id_area_banjir, nama_area_banjir, level_area_banjir} = req.body
      if(id_area_banjir){
        let result = await t_area_banjir.update({nama_area_banjir, level_area_banjir}, {where: {id_area_banjir}})
        next(true)
      }else{
        next([500, 'Area banjir tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async delete(req, res, next){
    try {
      const {id_area_banjir} = req.body
      if(id_area_banjir){
        let result = await t_area_banjir.destroy({where: {id_area_banjir}})
        next(true)
      }else{
        next([500, 'Area banjir tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
}

module.exports = AreaBanjir