
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    add,
    update
}

async function query(id, query) {
    console.log('id is:', id, 'query is:', query)
    var criteria;
    if (query === 'ordersList') criteria = { 'user.userId': `${id}` };
    if (query === 'ordersReq') criteria = { 'hostId': `${id}` };
    const collection = await dbService.getCollection('order')
    try {
        console.log(criteria)
        const orders = await collection.find(criteria).toArray();

        return orders
    } catch (err) {
        console.log('ERROR: cannot find Orders')
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
        console.log(`ERROR: cannot update customer ${order._id}`)
        throw err;
    }
}

async function getById(orderId) {

    console.log('order id:', orderId)
    const collection = await dbService.getCollection('order')
    try {
        const order = await collection.findOne({ "_id": ObjectId(orderId) })
        return order
    } catch (err) {
        console.log(`ERROR: cannot find order ${orderId}`)
        throw err;
    }
}

async function add(order) {

    // review.byUserId = ObjectId(review.byUserId);
    // review.aboutUserId = ObjectId(review.aboutUserId);
    console.log(order)
    const collection = await dbService.getCollection('order')
    try {
        await collection.insertOne(order);
        return order;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}



