const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { addHouse, getHouses, deleteHouse, getById, update, hostHouses } = require('./house.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)
// router.get('/query/:q?', getHouses)
// router.post('/',  requireAuth, addHouse)
// router.delete('/:id',  requireAuth, deleteHouse)
router.get('/host/:id?', hostHouses)
router.get('/query/:q?/:d?', getHouses)
router.get('/:id', getById)
router.post('/', addHouse)
router.delete('/:id', deleteHouse)
router.put('/:id', update)

module.exports = router