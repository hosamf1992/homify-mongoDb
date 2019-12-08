const logger = require('../../services/logger.service')

module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
       
        socket.on('order details', orderId=>{
            io.emit('get order details', orderId)
        })
       
        socket.on('response', res=>{
            io.emit('response order', res)
        })
        socket.on('disconnect', function () {
            logger.info('user connect')
        });
      

    })
    
}