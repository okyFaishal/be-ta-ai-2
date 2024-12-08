const sq = require('../../config/connection.js')
const m_rute_jalur = require('./model.js')
const m_rute_koordinat = require('../rute_koordinat/model.js')
const m_rute_jalur_koordinat = require('../rute_jalur_koordinat/model.js')
const { QueryTypes, Op } = require('sequelize')
const { v4: uuid_v4 } = require('uuid')
const axios = require('axios');

class RuteJalur{
  static async read(req, res, next){
    try {
      const { jumlah, halaman, nama_rute_jalur, satu_arah, akses_motor, type_jalan } = req.body

      // filter
      let isi = ''
      if(nama_rute_jalur) isi += ' and d.nama_rute_jalur = :nama_rute_jalur '
      if(satu_arah) isi += ' and d.satu_arah = :satu_arah '
      if(akses_motor) isi += ' and d.akses_motor = :akses_motor '
      if(type_jalan) isi += ' and d.type_jalan = :type_jalan '

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
        from rute_jalur d
        where true ${isi}
        order by d.nama_rute_jalur desc ${isi2}
      `,{ replacements: { ...req.body }, type: QueryTypes.SELECT }) // filter dengan like harus dimodifikasi
      if(isi2){
        // query pagination untuk mendapatkan count
        let count = await sq.query(`
          select count(*) as count 
          from rute_jalur d
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
      const {nama_rute_jalur, satu_arah, akses_motor, type_jalan} = req.body
      let result = await m_rute_jalur.create({id_rute_jalur: uuid_v4(), nama_rute_jalur, satu_arah, akses_motor, type_jalan })
      next([200, 'success', result])
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async update(req, res, next){
    try {
      let {id_rute_jalur, nama_rute_jalur, satu_arah, akses_motor, type_jalan} = req.body
      if(id_rute_jalur){
        let result = await m_rute_jalur.update({nama_rute_jalur, satu_arah, akses_motor, type_jalan}, {where: {id_rute_jalur}})
        next(true)
      }else{
        next([500, 'Rute jalur tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
  static async delete(req, res, next){
    try {
      const {id_rute_jalur} = req.body
      if(id_rute_jalur){
        let result = await m_rute_jalur.destroy({where: {id_rute_jalur}})
        next(true)
      }else{
        next([500, 'Rute jalur tidak ditemukan'])
      }
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }

  static async setRute(req, res, next){
    try {
      // await m_rute_jalur.destroy({where: {}})
      // await m_rute_koordinat.destroy({where: {}})
      await m_rute_jalur_koordinat.destroy({where: {}})
      const {range, lat, lng} = req.body
      const response = await axios.get('https://overpass-api.de/api/interpreter', {
        params: {
          data: `
            [out:json];
            way[highway~"^(motorway|trunk|primary|secondary|tertiary)$"](around:${range},${lat},${lng});
            out;>;out skel;
          `,
        },
      });
    
      // Parse hasil JSON dari API
      const datas = response.data;
      let listJalur = []
      const listKoordinat = []
      const listJalurKoordinat = []
      datas.elements.forEach(data => {
        if(data.type === "way"){
          listJalur.push({
            id_rute_jalur: data.id,
            nama_rute_jalur: data.tags.name || '-',
            satu_arah: data.tags.oneway == 'yes',
            akses_motor: data.tags.motorcycle == 'yes',
            type_jalan: data.tags.highway,
            panjang_jalur: 0,
          })
          for (let i = 0; i < data.nodes.length; i++) {
            const node = data.nodes[i];
            listJalurKoordinat.push({
              id_rute_jalur_koordinat: uuid_v4(),
              urutan: i + 1,
              id_rute_jalur: data.id,
              id_rute_koordinat: node,
            })
          }
        }else if(data.type === "node"){
          listKoordinat.push({
            id_rute_koordinat: data.id,
            lat_rute_koordinat: data.lat,
            lng_rute_koordinat: data.lon,
          })
        }
      });
      // menghitung jarak di jalur / way
      const dataJalur = {}
      listJalurKoordinat.forEach(data => {
        if(!dataJalur[data.id_rute_jalur]) dataJalur[data.id_rute_jalur] = []
        dataJalur[data.id_rute_jalur].push(listKoordinat.find(x => x.id_rute_koordinat === data.id_rute_koordinat))
      })
      const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const toRadians = (degree) => degree * (Math.PI / 180);
        const R = 6371e3; // Radius bumi dalam meter
      
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) ** 2 +
                  Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                  Math.sin(dLon / 2) ** 2;
      
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      };      
      const calculateWayDistances = (data) =>
        Object.fromEntries(Object.entries(data).map(([way, nodes]) => {
          const distance = nodes
            .filter(Boolean) // Abaikan `undefined`
            .reduce((sum, curr, idx, arr) => {
              if (idx === 0) return sum;
              const prev = arr[idx - 1];
              return sum + haversineDistance(
                prev.lat_rute_koordinat, prev.lng_rute_koordinat,
                curr.lat_rute_koordinat, curr.lng_rute_koordinat
              );
            }, 0);
          return [way, distance];
        }));
      const panjangJalur = calculateWayDistances(dataJalur)
      listJalur = listJalur.map(x => {return{
        ...x,
        panjang_jalur: parseInt(panjangJalur[x.id_rute_jalur]) || 0
      }})

      // inject data
      await m_rute_jalur.bulkCreate(listJalur, { updateOnDuplicate: ['id_rute_jalur'] })
      await m_rute_koordinat.bulkCreate(listKoordinat, { updateOnDuplicate: ['id_rute_koordinat'] })
      await m_rute_jalur_koordinat.bulkCreate(listJalurKoordinat)
      next([200, 'success'])
    } catch (error) {
      console.log('error >> ', error)
      next([500, 'Server error', error])
    }
  }
}


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

module.exports = RuteJalur