const socketIO  = require('socket.io');

class SocketWrapper {
    constructor(server){
        this.io = socketIO(server);
        this.io.on("connection", (socket) =>{
            console.log("New connection");

            socket.emit('newMessage', {
                from : 'Admin',
                text : 'Welcome in chat app',
                createdAt : new Date()
            },function(){
                console.log('Got it')
            });

            socket.broadcast.emit('newMessage',{
                from : 'Admin',
                text : 'New user joined the chat',
                createdAt: new Date()
            });

            socket.on('createMessage',(data, callback) => {
                socket.broadcast.emit('newMessage',{
                    from : data.from,
                    text : data.text,
                    createdAt: new Date()
                });
                callback({text : 'Data from server'});

                socket.emit('newMessage',{
                    from : data.from,
                    text : data.text,
                    createdAt: new Date()
                });
                callback({text : 'Data from server'})
            });

            socket.on("disconnect", () => {
                console.log("Disconnected");
            })
        });

    }
}

module.exports = SocketWrapper;