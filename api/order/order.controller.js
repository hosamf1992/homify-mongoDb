const orderService = require('./order.service')
 
async function getOrders(req, res) {
    console.log(req.query);
    const orders = await orderService.query(req.query)
    res.send(orders)
}


async function getById(req,res){
    let id=req.params.id
    console.log(id)
    const orders= await orderService.getById(id)
    res.send(orders)

}
async function addOrder(req, res) {
    var order = req.body;
    
    // review.byUserId = req.session.user._id;
    order = await orderService.add(order)
    // review.byUser = req.session.user;
    // review.aboutUser = {} 
    res.send(order)
}

module.exports = {
   
    addOrder,
    getById,
    getOrders
}