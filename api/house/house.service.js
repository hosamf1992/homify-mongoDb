
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    remove,
    add,
    getById,
    update
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy);
   
    console.log("filter by", criteria)
    const collection = await dbService.getCollection('house', 'house_db')
    try {
        const houses = await collection.find(criteria).toArray();
        // if (dates !== undefined) {
        //     const filterd = await datesInRange(dates, houses)
        //     return filterd
        // }
        console.log(houses)
        return houses
    } catch (err) {
        console.log('ERROR: cannot find houses')
        throw err;
    }
}


async function remove(houseId) {
    console.log(houseId)
    const collection = await dbService.getCollection('house', 'house_db')
    try {
        await collection.deleteOne({ "_id": ObjectId(houseId) })
    } catch (err) {
        console.log(`ERROR: cannot remove house ${houseId}`)
        throw err;
    }
}

async function add(house) {


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
        const house = await collection.findOne({ "_id": ObjectId(houseId) })
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

        await collection.updateOne({ "_id": ObjectId(house._id) }, { $set: house })
        return house
    } catch (err) {
        console.log(`ERROR: cannot update customer ${house.id}`)
        throw err;
    }
}



function _buildCriteria(filterBy) {
    var criteria;
    if (filterBy === "undefined") return criteria = {}
    criteria = { 'location.address.country': { '$regex': `${filterBy}`, $options: 'i' } }
    return criteria
}

function datesInRange(date, houses) {
    const dates = date.split(" ");
    var startD = new Date(dates[0]);
    var endD = new Date(dates[1]);
    var min;
    var max;
    return houses.filter(house => {
        const startDate = new Date(house.dates.from);
        const endDate = new Date(house.dates.to);
        // return (startD >= startDate && endD <= endDate)

    })

}







