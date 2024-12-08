const Primevue = require('../../midleware/primevue')
const authentification = require('../../midleware/authentification')
const uploadImage = require('../../helper/uploadImage')
const Controller = require('./controller')
const Router = require('express').Router()

Router.post('/test', Controller.test)
Router.post('/rute_1', Controller.rute1)
Router.post('/rute_2', Controller.rute2)

module.exports = Router