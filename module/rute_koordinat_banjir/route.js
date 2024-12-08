const Primevue = require('../../midleware/primevue')
const authentification = require('../../midleware/authentification')
const uploadImage = require('../../helper/uploadImage')
const Controller = require('./controller')
const Router = require('express').Router()

Router.post('/read', Controller.read)
Router.post('/create', Controller.create)
Router.post('/update', Controller.update)
Router.post('/delete', Controller.delete)

Router.post('/list_banjir', Controller.listBanjir)
Router.post('/set_banjir', Controller.setBanjir)
Router.post('/set_banjir_json', Controller.setBanjirJSON)

module.exports = Router