
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    add
}

async function query(filterBy = {}) {
    const collection = await dbService.getCollection('order', 'order_db')
    try {
        console.log('trying to')
        const reviews = await collection.find().toArray();
      
        return reviews
    } catch (err) {
        console.log('ERROR: cannot find customers')
        throw err;
    }
}

async function getById(orderId) {
    
    console.log('order id:',orderId)
    const collection = await dbService.getCollection('order', 'order_db')
    try {
        const order = await collection.findOne({"_id":ObjectId(orderId)})
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
    const collection = await dbService.getCollection('order', 'order_db')
    try {
        await collection.insertOne(order);
        return order;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}



