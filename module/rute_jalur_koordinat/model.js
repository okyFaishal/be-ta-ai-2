const { DataTypes } = require('sequelize')
const sq = require('../../config/connection.js')

const rute_jalur_koordinat = sq.define("rute_jalur_koordinat", {
  id_rute_jalur_koordinat: {
    type: DataTypes.STRING,
    primaryKey: true,
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

const rute_jalur = require('../rute_jalur/model.js')
rute_jalur_koordinat.belongsTo(rute_jalur, {foreignKey: 'id_rute_jalur'})
rute_jalur.hasMany(rute_jalur_koordinat, {foreignKey: 'id_rute_jalur'})

const rute_koordinat = require('../rute_koordinat/model.js')
rute_jalur_koordinat.belongsTo(rute_koordinat, {foreignKey: 'id_rute_koordinat'})
rute_koordinat.hasMany(rute_jalur_koordinat, {foreignKey: 'id_rute_koordinat'})

module.exports = rute_jalur_koordinat 