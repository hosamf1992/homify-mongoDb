const houseService = require('./house.service')

async function getHouses(req, res) {
    let query = req.params.q
    let dates = req.params.d
    console.log(query, dates)
    const houses = await houseService.query(query,dates)
    // const houses = await houseService.query(req.query)

    res.send(houses)
}
async function hostHouses(req, res) {
    let query = req.params.id
  
    const houses = await houseService.hostHouses(query)

    res.send(houses)
}

async function deleteHouse(req, res) {
    let id = req.params.id
    await houseService.remove(id)
    res.end()
}

async function addHouse(req, res) {
    var house = req.body;
    console.log(house)
    //later
    // house.byUserId = req.session.user._id;
    house = await houseService.add(house)
    // house.byUser = req.session.user;
    // house.aboutUser = {} 
    res.send(house)
}
async function getById(req, res) {
    let id = req.params.id
    const house = await houseService.getById(id)
    res.send(house)

}
async function update(req, res) {
    console.log('updating')
    var updatedHouse = req.body;
    console.log('updating', updatedHouse)

    const house = await houseService.update(updatedHouse)
    res.send(house)

}

module.exports = {
    getHouses,
    deleteHouse,
    addHouse,
    getById,
    update,
    hostHouses
}