const moment = require('moment');
const cron = require('node-cron');
const { QueryTypes, Op } = require('sequelize')

const sq = require('../config/connection.js')

cron.schedule('0 * * * *', async () => { // 1 jam
// cron.schedule('*/5 * * * * *', async () => { // 5 detik
});

// jika dalam waktu 1 jam dari order belum di bayar, maka akan otomatis di batalkan
async function test() {
  await sq.transaction(async (t) => {
    console.log('test cron', new Date())
    // // Mendapatkan data order_produk yang memenuhi kondisi
    // const orderProduksToUpdate = await sq.query(
    //   `SELECT * FROM order_produk WHERE created_at <= NOW() - INTERVAL 1 HOUR AND status_order_produk = 1`,
    //   { type: sq.QueryTypes.SELECT, transaction: t }
    // );
  });
}