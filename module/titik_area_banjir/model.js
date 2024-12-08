const { DataTypes } = require('sequelize')
const sq = require('../../config/connection.js')

const titik_area_banjir = sq.define("titik_area_banjir", {
  id_titik_area_banjir: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  lat_titik_area_banjir: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lng_titik_area_banjir: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urutan_titik_area_banjir: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  paranoid: true,
  freezeTableName: true,
})

const area_banjir = require('../area_banjir/model.js')
titik_area_banjir.belongsTo(area_banjir, {foreignKey: 'id_area_banjir'})
area_banjir.hasMany(titik_area_banjir, {foreignKey: 'id_area_banjir'})

module.exports = titik_area_banjir 