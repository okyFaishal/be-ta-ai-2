const command = process.argv[process.argv.indexOf(__filename.replace(/\..*/, ''))+1] //perintah
const koneksi = require('./config/connection');

let normalizedPath = require("path").join(__dirname, "./module");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  console.log(file)
  // if(__dirname.includes())
  let normalize = require("path").join(__dirname, "./module/"+file)
  require("fs").readdirSync(normalize).forEach(function(file2) {
    if(file2=="model.js"){
        require(`./module/${file}/model.js`)
    }
  })
})
// perlu diperbaiki
// saat di node dbsync seharusnya tidak mereset isi database
async function start() {
  if(command == 'refresh'){
    console.log('Database akan di Sinkronisasi')
    await koneksi.sync({ force: true })
    console.log('Database Berhasil di Sinkronisasi')
  }else if(command == '' || !command){ // 
    console.log('Database akan di dbsync')
    await koneksi.sync({ alter: true })
    console.log('Database Berhasil di dbsync')
  }else if(command == 'seed'){ // reset database dan buat data dummy
    console.log('Database akan di Reset')
    await koneksi.drop()
    await koneksi.sync({ force: true })
    const seed = require('./seed')
    await seed.start()
    console.log('Database Berhasil di Reset')
  }else if(command == 'delete'){ // hapus tabel
    console.log('Tabel akan di Delete')
    await koneksi.drop()
    console.log('Tabel Berhasil di Delete')
  }else{ // tidak valid
    console.log('Input Tidak Valid')
  }
  process.exit(0);
}
start()