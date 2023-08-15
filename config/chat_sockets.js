module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.on('connection', (socket) => {
            console.log('new connection received', socket.id);

            socket.on('disconnect', function () {
                console.log('socket disconnected!');
            });

            socket.on('join_room',function(data){
                console.log('join request rec',data);

                socket.join(data.chatroom); // if room with name is not exist thenit will create a new room with that name to join
                io.in(data.chatroom).emit('user_joind',data); // the event name 'user_joined' should not be having a spacce in between
            });

            // CHANGE :: detect send_message and broadcast to everyone in the room
            socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}