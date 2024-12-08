const {verifyToken} = require('../helper/jwt')
const sq = require('../config/connection.js')
const { QueryTypes, Op } = require('sequelize')

class authentification{
  static async all(req, res, next){
    try {
      // pengecekan auth standar
      const result = await cek(req)
      if(result.status === true){ // jika berhasil
        req.body.account = result.data
        // for (const key in result.data) {
        //   req.body[key] = result.data[key]
        // }
        next()
      }else{ // jika gagal 
        next([result.status, result.message])
      }
    } catch (error) {
      console.log(error)
      next([500, 'server error'])
    }
  }
  static async user_only(req, res, next){
    try {
      // pengecekan auth standar
      const result = await cek(req)
      if(result.status === true){ // jika berhasil
        req.body.account = result.data
        if(req.body.account.id_akun_pengurus){
          next()
        }else{
          next([500, 'Anda tidak memiliki akses'])
        }
      }else{ // jika gagal 
        next([result.status, result.message])
      }
    } catch (error) {
      console.log(error)
      next([500, 'server error'])
    }
  }
  static async member_only(req, res, next){
    try {
      // pengecekan auth standar
      const result = await cek(req)
      if(result.status === true){ // jika berhasil
        req.body.account = result.data
        if(req.body.account.id_akun_member){
          next()
        }else{
          next([500, 'Anda tidak memiliki akses'])
        }
      }else{ // jika gagal 
        next([result.status, result.message])
      }
    } catch (error) {
      console.log(error)
      next([500, 'server error'])
    }
  }
}

async function cek(req){
  try {
    if(req.headers.token){
      req.body.account = verifyToken(req.headers.token)
      if(req.body.account.id_akun_pengurus){ // === akun user ===
        const result = await sq.query(`
          select *
          from \`akun_pengurus\` u 
          inner join role r on r.id_role = u.id_role and r.deleted_at is null 
          where u.id_akun_pengurus = :id_akun_pengurus and u.deleted_at is null
        `, { replacements: { id_akun_pengurus: req.body.account.id_akun_pengurus }, type: QueryTypes.SELECT })
        if(result.length){
          return { status: true, data: result[0] }
        }else{
          return { status: 401, message: "anda belum login" }
        }
      }else if(req.body.account.id_akun_member){ // === akun company ===
        const result = await sq.query(`
          select *
          from \`akun_member\` c
          where c.id_akun_member = :id_akun_member and c.deleted_at is null
        `, { replacements: { id_akun_member: req.body.account.id_akun_member }, type: QueryTypes.SELECT })
        if(result.length){
          return { status: true, data: result[0] }
        }else{
          return { status: 401, message: "anda belum login" }
        }
      }else{
        return { status: 401, message: "Terdapat masalah kepada akun anda, silahkan hubungi admin" }
      }
    }else{
      return { status: 401, message: "Anda belum login" }
    }
  } catch (error) {
    console.log(error)
    return { status: 500, message: "server error" }
  }
}
module.exports = authentification
