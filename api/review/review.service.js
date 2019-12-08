
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    add
}

async function query(filterBy = {}) {
    const collection = await dbService.getCollection('review')
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

    // console.log(reviewId)
    const collection = await dbService.getCollection('review')
    try {
        const reviews = await collection.find({ houseId: reviewId }).toArray();
        const rate = calcRating(reviews)
        setRating(reviewId, rate)
        return reviews
    } catch (err) {
        console.log(`ERROR: cannot find review ${reviewId}`)
        throw err;
    }
}

async function add(review) {

    const collection = await dbService.getCollection('review')
    try {
        await collection.insertOne(review);
        return review;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

async function setRating(id, avgRate) {
    const collection = await dbService.getCollection('house')
    try {
        console.log('trying to update')
        collection.updateOne({ "_id": ObjectId(id) }, { $set: { "reviews.avgRating": `${avgRate.avg}`,"reviews.reviewCount": `${avgRate.count}` } });
    } catch (err) {
        console.log(`ERROR: cannot find review `)
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
        rateMap[review.rating] = (rateMap[review.rating])? rateMap[review.rating] + 1 : 1 
        // rateMap[review.rating] = rateMap[review.rating] + 1 || 1; 
    })
   var average = sum / reviewsCount;
   var rating = {
        avg: average.toFixed(1),
        count: reviewsCount
    }
    return rating


}




