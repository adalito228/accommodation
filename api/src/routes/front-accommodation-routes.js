module.exports = (app) => {
  const router = require('express').Router()
  const controller = require('../controllers/front/accommodation-controller')

  router.get('/', controller.findAll)
  router.post('/', controller.create)

  app.use('/api/front/accommodations', router) // llamada fetch
}
