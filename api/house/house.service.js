
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    remove,
    add,
    getById,
    update
}

async function query() {
    const collection = await dbService.getCollection('house', 'house_db')
    try {
        console.log('trying to')
        const houses = await collection.find().toArray();
      
        return houses
    } catch (err) {
        console.log('ERROR: cannot find customers')
        throw err;
    }
}


async function remove(houseId) {
  console.log(houseId)
    const collection = await dbService.getCollection('house', 'house_db')
    try {
        await collection.deleteOne({"_id": ObjectId(houseId) })
    } catch (err) {
        console.log(`ERROR: cannot remove house ${houseId}`)
        throw err;
    }
}

async function add(house) {
    //later
    // review.byUserId = ObjectId(review.byUserId);
    // review.aboutUserId = ObjectId(review.aboutUserId);

    const collection = await dbService.getCollection('house', 'house_db')
    try {
        await collection.insertOne(house);
        return house;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}
async function getById(houseId) {
    const collection = await dbService.getCollection('house', 'house_db')
    try {
        const house = await collection.findOne({"_id":ObjectId(houseId)})
        return house
    } catch (err) {
        console.log(`ERROR: cannot find customer ${houseId}`)
        throw err;
    }
}

async function update(house) {
    house._id = ObjectId(house._id);
  
    const collection = await dbService.getCollection('house', 'house_db')
    try {
   
        await collection.updateOne({"_id":ObjectId(house._id)}, {$set : house})
        return house
    } catch (err) {
        console.log(`ERROR: cannot update customer ${house.id}`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}


