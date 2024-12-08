const { DataTypes } = require('sequelize')
const sq = require('../../config/connection.js')

const rute_koordinat = sq.define("rute_koordinat", {
  id_rute_koordinat: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  lat_rute_koordinat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lng_rute_koordinat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  paranoid: false,
  freezeTableName: true,
  timestamps: false,
})

const wilayah = require('../wilayah/model.js')
rute_koordinat.belongsTo(wilayah, {foreignKey: 'kode_full_wilayah'})
wilayah.hasMany(rute_koordinat, {foreignKey: 'kode_full_wilayah'})

module.exports = rute_koordinat 