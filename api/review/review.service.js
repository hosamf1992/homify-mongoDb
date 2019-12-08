const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const logger = require('../../services/logger.service')

module.exports = {
    query,
    add
}

async function query(houseId) {
    const collection = await dbService.getCollection('review')
    try {
        const reviews = await collection.find({ houseId: houseId }).toArray();
        return reviews
    } catch (err) {
        logger.error(`ERROR: cannot find  review ${houseId}`)
        throw err;
    }
}

async function add(review) {
    const collection = await dbService.getCollection('review')
    try {
        await collection.insertOne(review);
        const reviews = await getCurrHousRevs(review.houseId)
        const rate = calcRating(reviews)
        setRating(review.houseId, rate)
        return review;
    } catch (err) {
        logger.error(`ERROR: cannot insert  review ${review}`)
        throw err;
    }
}

async function setRating(id, avgRate) {
    const collection = await dbService.getCollection('house')
    try {
        collection.updateOne({ "_id": ObjectId(id) }, { $set: { "reviews.avgRating": `${avgRate.avg}`, "reviews.reviewCount": `${avgRate.count}` } });
    } catch (err) {
        logger.error(`ERROR: cannot set  rating `)
        throw err;
    }
}

function calcRating(reviews) {
    var sum = 0;
    var reviewsCount = 0;
    var rateMap = {};
    reviews.forEach(review => {
        reviewsCount++;
        sum += +review.rating;
        rateMap[review.rating] = rateMap[review.rating] + 1 || 1; 
    })
    var average = sum / reviewsCount;
    var rating = {
        avg: average.toFixed(1),
        count: reviewsCount
    }
    return rating
}

async function getCurrHousRevs(houseId) {
    const collection = await dbService.getCollection('review')
    const reviews = await collection.find({ houseId: houseId }).toArray();
    return reviews
}