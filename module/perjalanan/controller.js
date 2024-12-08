const sq = require('../../config/connection.js')
const { QueryTypes, Op } = require('sequelize')
const { v4: uuid_v4 } = require('uuid')
const { spawn } = require('child_process');
const moment = require("moment")

class RutePerjalanan{
  static async test(req, res, next){
    try {
       // Spawn proses Python
      const python = spawn('python', ['./python/test1.py']);

      // Kirim data ke script Python
      python.stdin.write(JSON.stringify(req.body));
      python.stdin.end();
  
      let result = '';
      python.stdout.on('data', (data) => {
        result += data.toString();
      });
  
      python.stderr.on('data', (data) => {
        console.error('Error:', data.toString());
      });
  
      python.on('close', (code) => {
        if (code === 0) {
          // console.log("result", result)
          next([200, 'success', {data: JSON.parse(result)}])
          // res.json(JSON.parse(result));
        } else {
          next([500, 'Python script failed'])
          // res.status(500).send('Python script failed');
        }
      });
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  
  static async rute1(req, res, next){
    try {
      const {tanggal_waktu, asal, tujuan} = req.body
      if(tanggal_waktu){
        
        // get data rute
        let resRute = await sq.query(`
          select banjir, lat_rute_koordinat, lng_rute_koordinat, satu_arah, id_rute_jalur, id_rute_koordinat from rute_koordinat_banjir  
          where tanggal_waktu = :tanggal_waktu OR tanggal_waktu is null
          order by id_rute_jalur, urutan asc
        `,{ replacements: { ...req.body }, type: QueryTypes.SELECT })
        // convert data rute
        const rutes = {}
        for (let a = 0; a < resRute.length; a++) {
          const jalur = resRute[a];
          if(!rutes[jalur.id_rute_jalur]) rutes[jalur.id_rute_jalur] = []
          rutes[jalur.id_rute_jalur].push(jalur)
        }
        req.body.dataRute = rutes
        // next([200, 'success', {data: rutes}])
        
        // Spawn proses Python
        const python = spawn('python', ['./python/rute_1.py']);

        // Kirim data ke script Python
        python.stdin.write(JSON.stringify(req.body));
        python.stdin.end();
    
        let result = '';
        python.stdout.on('data', (data) => {
          result += data.toString();
        });
    
        python.stderr.on('data', (data) => {
          console.error('Error:', data.toString());
        });
    
        python.on('close', (code) => {
          // console.log('result', result)
          if (code === 0) {
            // console.log("result", result)
            // next([200, 'success', {data: JSON.parse(result.replace("'", '"'))}])
            next([200, 'success', {data: result}])
            // res.json(JSON.parse(result));
          } else {
            next([500, 'Python script failed'])
            // res.status(500).send('Python script failed');
          }
        });
        // console.log('rutes', rutes)
      }else{
        next([500, 'Masukkan tanggal'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async rute2(req, res, next){
    try {
      const {tanggal_waktu, asal, tujuan} = req.body
      if(tanggal_waktu){
        req.body.direktoriRute = `json/cuaca/${moment(tanggal_waktu).format('YYYY-MM-DD HH-mm')}.json`
        // Spawn proses Python
        const python = spawn('python', ['./python/rute_2.py']);

        // Kirim data ke script Python
        python.stdin.write(JSON.stringify(req.body));
        python.stdin.end();
    
        let result = '';
        python.stdout.on('data', (data) => {
          result += data.toString();
        });
    
        python.stderr.on('data', (data) => {
          console.error('Error:', data.toString());
        });
    
        python.on('close', (code) => {
          // console.log('result', result)
          if (code === 0) {
            // console.log("result", result)
            // next([200, 'success', {data: JSON.parse(result.replace("'", '"'))}])
            next([200, 'success', {data: result}])
            // res.json(JSON.parse(result));
          } else {
            next([500, 'Python script failed'])
            // res.status(500).send('Python script failed');
          }
        });
        // console.log('rutes', rutes)
      }else{
        next([500, 'Masukkan tanggal'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
}

module.exports = RutePerjalanan
