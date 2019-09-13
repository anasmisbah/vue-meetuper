module.exports = function (io) {
    io.on('connection',function(socket){
        console.log('connection has been established');
        // //this is comming from our client
        // socket.on('meetup/postSave',function (post) {
        //     //this is going to our clients
        //     io.emit('meetup/postPublished',post)
        // })

        socket.on('meetup/subscribe',function (meetupId) {
            console.log('joining meetup ',`meetup-${meetupId}`);
            socket.join(`meetup-${meetupId}`)
        })

        socket.on('meetup/unsubscribe',function (meetupId) {
            console.log('leaving meetup ',`meetup-${meetupId}`);
            socket.leave(`meetup-${meetupId}`)
        })

        socket.on('meetup/postSaved',function (post) {
            console.log('emitting to meetup ',`meetup-${post.meetup}`);
            socket.to(`meetup-${post.meetup}`).emit('meetup/postPublished',post)
            
        })
    })
    
}