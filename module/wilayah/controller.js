const sq = require('../../config/connection.js')
const m_wilayah = require('./model.js')

const { QueryTypes, Op } = require('sequelize')
const { v4: uuid_v4 } = require('uuid')

class Wilayah{
  static async read(req, res, next){
    try {
      const { jumlah, halaman, nama_wilayah, tingkat_wilayah, kode_wilayah, kode_full_wilayah, head_wilayah } = req.body

      // filter
      let isi = ''
      if(nama_wilayah) isi += ' and d.nama_wilayah = :nama_wilayah '
      if(tingkat_wilayah) isi += ' and d.tingkat_wilayah = :tingkat_wilayah '
      if(kode_wilayah) isi += ' and d.kode_wilayah = :kode_wilayah '
      if(kode_full_wilayah) isi += ' and d.kode_full_wilayah = :kode_full_wilayah '
      if(head_wilayah) isi += ' and d.head_wilayah = :head_wilayah '

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
        from wilayah d
        where true ${isi}
        order by d.kode_full_wilayah asc ${isi2}
      `,{ replacements: { ...req.body }, type: QueryTypes.SELECT }) // filter dengan like harus dimodifikasi
      if(isi2){
        // query pagination untuk mendapatkan count
        let count = await sq.query(`
          select count(*) as count 
          from wilayah d
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
      const {nama_wilayah, tingkat_wilayah, kode_wilayah, kode_full_wilayah, head_wilayah} = req.body
      let result = await m_wilayah.create({nama_wilayah, tingkat_wilayah, kode_wilayah, kode_full_wilayah, head_wilayah })
      next([200, 'success', result])
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async update(req, res, next){
    try {
      let {nama_wilayah, tingkat_wilayah, kode_wilayah, kode_full_wilayah, head_wilayah} = req.body
      if(kode_full_wilayah){
        let result = await m_wilayah.update({nama_wilayah, tingkat_wilayah, kode_wilayah, kode_full_wilayah, head_wilayah}, {where: {kode_full_wilayah}})
        next(true)
      }else{
        next([500, 'Wilayah tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async delete(req, res, next){
    try {
      const {kode_full_wilayah} = req.body
      if(kode_full_wilayah){
        let result = await m_wilayah.destroy({where: {kode_full_wilayah}})
        next(true)
      }else{
        next([500, 'Wilayah tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async setWilayah(req, res, next){
    try {
      await m_wilayah.destroy({where: {}})
      const listWilayah = require('./wilayah.json');
      let container = []
      for (let i = 0; i < listWilayah.length; i++) {
        const wilayah = listWilayah[i];
        const kode = wilayah[0].split('.')
        const nama = wilayah[1]
        container.push({
          nama_wilayah: nama,
          tingkat_wilayah: kode.length,
          kode_wilayah: kode[kode.length - 1],
          kode_full_wilayah: wilayah[0],
          head_wilayah: kode.length > 1 ? wilayah[0].match(/^(.+)\.\d+$/)[1] : null,
        })
        if(i % 10000 === 0){
          // console.log(i)
          await m_wilayah.bulkCreate(container)
          container = []
        }
      }
      if(container.length){
        await m_wilayah.bulkCreate(container)
        container = []
      }
      next([200, 'success'])
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
}

module.exports = Wilayah