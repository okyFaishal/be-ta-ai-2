const { DataTypes } = require('sequelize')
const sq = require('../../config/connection.js')

const rute_jalur = sq.define("rute_jalur", {
  id_rute_jalur: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nama_rute_jalur: {
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
  panjang_jalur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
},{
  paranoid: false,
  freezeTableName: true,
  timestamps: false,
})

module.exports = rute_jalur 