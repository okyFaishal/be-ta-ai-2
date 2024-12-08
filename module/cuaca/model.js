const { DataTypes } = require('sequelize')
const sq = require('../../config/connection.js')

const cuaca = sq.define("cuaca", {
  id_cuaca: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  tanggal_waktu: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // 0 = Cerah = Langit bersih tanpa awan.
  // 1 = Cerah Berawan = Langit sebagian tertutup awan, tetapi cerah.
  // 2 = Berawan = Langit hampir sepenuhnya tertutup awan.
  // 3 = Mendung = Langit sepenuhnya tertutup awan tebal.
  // 4 = Hujan Ringan = Turun hujan dengan intensitas ringan.
  // 5 = Hujan Sedang = Turun hujan dengan intensitas sedang.
  // 6 = Hujan Lebat = Turun hujan dengan intensitas tinggi.
  // 7 = Hujan Petir = Hujan disertai petir atau badai petir.
  // 8 = Kabut = Terbatasnya jarak pandang akibat kabut tebal.
  // 9 = Asap = Udara tercemar akibat asap atau polusi.
  // 10 = Hujan Es atau Hujan Salju = Hujan yang mengandung es atau salju (jarang di Indonesia).
  kondisi_cuaca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  curah_hujan: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
},{
  paranoid: false,
  freezeTableName: true,
  timestamps: false,
  indexes: [
    // Create a unique index on email
    {
      primaryKey: true,
      fields: ['tanggal_waktu', 'kode_full_wilayah'],
    },
  ]
})

const wilayah = require('../wilayah/model.js')
cuaca.belongsTo(wilayah, {foreignKey: 'kode_full_wilayah'})
wilayah.hasMany(cuaca, {foreignKey: 'kode_full_wilayah'})

module.exports = cuaca 