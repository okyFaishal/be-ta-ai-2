const sq = require('../../config/connection.js')
const m_rute_jalur_koordinat = require('./model.js')
const { QueryTypes, Op } = require('sequelize')
const { v4: uuid_v4 } = require('uuid')

class RuteJalurKoordinat{
  static async read(req, res, next){
    try {
      const { jumlah, halaman, urutan, id_rute_jalur, id_rute_koordinat } = req.body

      // filter
      let isi = ''
      if(urutan) isi += ' and d.urutan = :urutan '
      if(id_rute_jalur) isi += ' and d.id_rute_jalur = :id_rute_jalur '
      if(id_rute_koordinat) isi += ' and d.id_rute_koordinat = :id_rute_koordinat '

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
      const {urutan, id_rute_jalur, id_rute_koordinat} = req.body
      let result = await m_rute_jalur_koordinat.create({id_rute_jalur_koordinat: uuid_v4(), urutan, id_rute_jalur, id_rute_koordinat })
      next([200, 'success', result])
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async update(req, res, next){
    try {
      let {id_rute_jalur_koordinat, urutan, id_rute_jalur, id_rute_koordinat} = req.body
      if(id_rute_jalur_koordinat){
        let result = await m_rute_jalur_koordinat.update({urutan, id_rute_jalur, id_rute_koordinat}, {where: {id_rute_jalur_koordinat}})
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
      const {id_rute_jalur_koordinat} = req.body
      if(id_rute_jalur_koordinat){
        let result = await m_rute_jalur_koordinat.destroy({where: {id_rute_jalur_koordinat}})
        next(true)
      }else{
        next([500, 'Rute jalur koordinat tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
}

module.exports = RuteJalurKoordinat