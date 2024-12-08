const { DataTypes } = require('sequelize')
const sq = require('../../config/connection.js')

const rute_koordinat_banjir = sq.define("rute_koordinat_banjir", {
  id_rute_koordinat_banjir: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  banjir: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  kondisi_cuaca: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  curah_hujan: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  tanggal_waktu: {
    type: DataTypes.DATE,
    allowNull: true,
    index: true,
  },
  lat_rute_koordinat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lng_rute_koordinat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  satu_arah: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  akses_motor: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  type_jalan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urutan: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  paranoid: false,
  freezeTableName: true,
  timestamps: false,
})

const cuaca = require('../cuaca/model.js')
rute_koordinat_banjir.belongsTo(cuaca, {foreignKey: 'id_cuaca'})
cuaca.hasMany(rute_koordinat_banjir, {foreignKey: 'id_cuaca'})

const rute_jalur = require('../rute_jalur/model.js')
rute_koordinat_banjir.belongsTo(rute_jalur, {foreignKey: 'id_rute_jalur'})
rute_jalur.hasMany(rute_koordinat_banjir, {foreignKey: 'id_rute_jalur'})

const rute_koordinat = require('../rute_koordinat/model.js')
rute_koordinat_banjir.belongsTo(rute_koordinat, {foreignKey: 'id_rute_koordinat'})
rute_koordinat.hasMany(rute_koordinat_banjir, {foreignKey: 'id_rute_koordinat'})

const area_banjir = require('../area_banjir/model.js')
rute_koordinat_banjir.belongsTo(area_banjir, {foreignKey: 'id_area_banjir'})
area_banjir.hasMany(rute_koordinat_banjir, {foreignKey: 'id_area_banjir'})

module.exports = rute_koordinat_banjir 