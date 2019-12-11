const reviewService = require('./review.service')

// async function getReviews(req, res) {
//     const reviews = await reviewService.query(req.query)
//     res.send(reviews)
// }

async function deleteReview(req, res) {
    await reviewService.remove(req.params.id)
    res.end()
}

async function getReviews(req, res) {
    let houseId = req.params.id
    const reviews = await reviewService.query(houseId)
    res.send(reviews)

}

async function addReview(req, res) {
    var review = req.body;
    // review.byUserId = req.session.user._id;
    review = await reviewService.add(review)
    // review.byUser = req.session.user;
    // review.aboutUser = {} 
    res.send(review)
}

module.exports = {
    deleteReview,
    addReview,
    getReviews
}