const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { addOrder, getById,getOrders ,update} = require('./order.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', getOrder)
router.get('/:id', getById)
router.get('/:q/:id', getOrders)
router.put('/:id', update)
router.post('/', addOrder)

// router.post('/',  requireAuth, addReview)
// router.delete('/:id',  requireAuth, deleteReview)

module.exports = router

