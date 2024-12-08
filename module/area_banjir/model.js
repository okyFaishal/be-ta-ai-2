const { DataTypes } = require('sequelize')
const sq = require('../../config/connection.js')

const area_banjir = sq.define("area_banjir", {
  id_area_banjir: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nama_area_banjir: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level_area_banjir: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  paranoid: true,
  freezeTableName: true,
})

module.exports = area_banjir 