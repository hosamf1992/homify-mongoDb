const orderService = require('./order.service')

async function getOrders(req, res) {
    const query = req.params.q
    const id = req.params.id
    const orders = await orderService.query(id, query)
    res.send(orders)
}

async function update(req, res) {
    var updatedOrder = req.body;
    const order = await orderService.update(updatedOrder)
    res.send(order)
}

async function getById(req, res) {
    let id = req.params.id
    const orders = await orderService.getById(id)
    res.send(orders)
}

async function addOrder(req, res) {
    var order = req.body;
    // review.byUserId = req.session.user._id;
    order = await orderService.add(order)
    // review.byUser = req.session.user;
    // review.aboutUser = {} 
    res.send(order)
}

module.exports = {
    addOrder,
    getById,
    getOrders,
    update
}