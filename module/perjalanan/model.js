const { DataTypes } = require('sequelize')
const sq = require('../../config/connection.js')

const rute_perjalanan = sq.define("rute_perjalanan", {
  id_rute_perjalanan: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  tujuan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  paranoid: true,
  freezeTableName: true,
})

module.exports = rute_perjalanan 