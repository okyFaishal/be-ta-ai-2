const { DataTypes } = require('sequelize')
const sq = require('../../config/connection.js')

const wilayah = sq.define("wilayah", {
  nama_wilayah: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tingkat_wilayah: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  kode_wilayah: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kode_full_wilayah: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  head_wilayah: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{
  paranoid: false,
  freezeTableName: true,
  timestamps: false,
})

module.exports = wilayah 