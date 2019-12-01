const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { addHouse, getHouses, deleteHouse, getById,update } = require('./house.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/query/:q?', getHouses)
router.get('/:id', getById)
// router.post('/',  requireAuth, addHouse)
router.post('/', addHouse)
router.delete('/:id', deleteHouse)
router.put('/:id', update)

// router.delete('/:id',  requireAuth, deleteHouse)

module.exports = router