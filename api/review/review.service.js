
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    add
}

async function query(filterBy = {}) {
    const collection = await dbService.getCollection('review', 'review_db')
    try {
        console.log('trying to')
        const reviews = await collection.find().toArray();
      
        return reviews
    } catch (err) {
        console.log('ERROR: cannot find customers')
        throw err;
    }
}

async function getById(reviewId) {
    
    console.log(reviewId)
    const collection = await dbService.getCollection('review', 'review_db')
    try {
        const reviews = await collection.find({houseId:reviewId}).toArray();
        return reviews
    } catch (err) {
        console.log(`ERROR: cannot find review ${reviewId}`)
        throw err;
    }
}

async function add(review) {

    // review.byUserId = ObjectId(review.byUserId);
    // review.aboutUserId = ObjectId(review.aboutUserId);

    const collection = await dbService.getCollection('review', 'review_db')
    try {
        await collection.insertOne(review);
        return review;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}



