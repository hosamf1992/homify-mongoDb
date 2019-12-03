
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        // socket.on('chat newMsg', msg=>{
        //     console.log(msg)
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            // io.to(socket.myTopic).emit('chat addMsg', msg)
        // })
        // socket.on('chat topic', topic=>{
        //     if (socket.myTopic) {
        //         socket.leave(socket.myTopic)
        //     }
        //     socket.join(topic)
        //     socket.myTopic = topic;
        // })
        socket.on('order details', order=>{
            console.log(order)
            io.emit('get order details', order)
        })
       

        socket.on('approve order', order=>{
            console.log('approved')
            io.emit('approve order', order)
        })
        socket.on('reject order', order=>{
            console.log('rejected')
            io.emit('reject order', order)
        })
    })
    
}