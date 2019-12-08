
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const logger = require('../../services/logger.service')

module.exports = {
    query,
    getById,
    add,
    update
}

async function query(id, query) {
    var criteria;
    if (query === 'ordersList') criteria = { 'user.userId': `${id}` };
    if (query === 'ordersReq') criteria = { 'hostId': `${id}` };
    const collection = await dbService.getCollection('order')
    try {
        const orders = await collection.find(criteria).toArray();

        return orders
    } catch (err) {
        logger.error(`ERROR: cannot find  order`)
        throw err;
    }
}
async function update(order) {
    order._id = ObjectId(order._id);
    const collection = await dbService.getCollection('order')
    try {
        await collection.updateOne({ "_id": ObjectId(order._id) }, { $set: order })
        return order
    } catch (err) {
        logger.error(`ERROR: cannot update  order`)
        throw err;
    }
}

async function getById(orderId) {

    const collection = await dbService.getCollection('order')
    try {
        const order = await collection.findOne({ "_id": ObjectId(orderId) })
        return order
    } catch (err) {
        logger.error(`ERROR: cannot find  order ${orderId}`)
        throw err;
    }
}

async function add(order) {

  
    const collection = await dbService.getCollection('order')
    try {
        await collection.insertOne(order);
        return order;
    } catch (err) {
        logger.error(`ERROR: cannot add  order `)
        throw err;
    }
}



