const Primevue = require('../../midleware/primevue')
const authentification = require('../../midleware/authentification')
const uploadImage = require('../../helper/uploadImage')
const Controller = require('./controller')
const Router = require('express').Router()

Router.post('/read', Controller.read)
Router.post('/create', Controller.create)
Router.post('/update', Controller.update)
Router.post('/delete', Controller.delete)

Router.post('/set_wilayah', Controller.setWilayah)

module.exports = Router