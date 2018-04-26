const socketIO  = require('socket.io');

class SocketWrapper {
    constructor(server){
        this.io = socketIO(server);
        this.io.on("connection", (socket) =>{
            console.log("New connection");

            socket.emit('newMessage', {
                from : 'andrzejh07@gmail.com',
                text : 'siema leszczu',
                createdAt : new Date()
            });

            socket.on('createMessage',(data) => {
                this.io.emit('newMessage',{
                    from : data.from,
                    text : data.text,
                    createdAt: new Date()
                });
            });

            socket.on("disconnect", () => {
                console.log("Disconnected");
            })
        });

    }
}

module.exports = SocketWrapper;