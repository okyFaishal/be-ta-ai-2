require('dotenv').config()
const { Sequelize } = require('sequelize');
const { Client } = require('mysql2')
const mysql  = require('mysql2')
const env = process.env
// const sequelize = new Sequelize(env.DB_NAME, env.DB_USERNAME, env.DB_PASSWORD, {
//   host: env.DB_HOST,
//   dialect: env.DB_DIAL,
//   logging: false // Untuk menonaktifkan logging SQL yang berlebihan (opsional)
// });
const sequelize = new Sequelize(
  env.DB_NAME,  
  env.DB_USERNAME,  
  env.DB_PASSWORD, 
  {
    host: env.DB_HOST,
    // port: env.DB_PORT,
    dialect: env.DB_DIAL,
    // connectTimeout: 60000,
    logging: false,
    define: {
      freezeTableName: true,
      underscored: true,
    },
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 10,   // Maksimal 10 koneksi
      min: 0,
      idle: 30000,  // Koneksi yang idle lebih dari 30 detik akan ditutup
      acquire: 30000,  // Waktu maksimal untuk mengambil koneksi dari pool (30 detik)
    },
    timezone: '+07:00'
  }
);

start()
async function start(){
  try {
    // console.log({
    //   user: env.DB_USERNAME,
    //   password: env.DB_PASSWORD,
    //   host: env.DB_HOST,
    //   database: env.DB_NAME,
    // })
    // create database
    // const connect = mysql.createConnection({
    //   user: env.DB_USERNAME,
    //   password: env.DB_PASSWORD,
    //   host: env.DB_HOST,
    //   database: env.DB_NAME,
    // })
    // connect.connect(function(err) {
    //   if (err) {
    //     console.error('Error koneksi MySQL:', err);
    //   } else {
    //     console.log('Koneksi MySQL berhasil!');
    //   }
    // });
    
    //test conncctio 
    await sequelize.authenticate();
    console.log('connection sq successfully');
  } catch (error) {
    console.error('ERROR');
    console.error(error);
  }
}

module.exports =  sequelize;