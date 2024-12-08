const Router = require('express').Router()

const area_banjir = require('../module/area_banjir/route')
Router.use('/area_banjir', area_banjir)

const cuaca = require('../module/cuaca/route')
Router.use('/cuaca', cuaca)

const perjalanan = require('../module/perjalanan/route')
Router.use('/perjalanan', perjalanan)

const rute_jalur = require('../module/rute_jalur/route')
Router.use('/rute_jalur', rute_jalur)

const rute_jalur_koordinat = require('../module/rute_jalur_koordinat/route')
Router.use('/rute_jalur_koordinat', rute_jalur_koordinat)

const rute_koordinat = require('../module/rute_koordinat/route')
Router.use('/rute_koordinat', rute_koordinat)

const rute_koordinat_banjir = require('../module/rute_koordinat_banjir/route')
Router.use('/rute_koordinat_banjir', rute_koordinat_banjir)

const titik_area_banjir = require('../module/area_banjir/route')
Router.use('/titik_area_banjir', titik_area_banjir)

const wilayah = require('../module/wilayah/route')
Router.use('/wilayah', wilayah)

module.exports = Router