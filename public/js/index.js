const socket = io();
socket.on('connect', function(){
    console.log('Connected to server');

    socket.emit('createMessage', {
       from : 'albano@deep-forecast.com',
       text : 'Le puta madre'
    });

});

socket.on('disconnect', function(){
    console.log('disconnected from server')
});

socket.on('newMessage', function(data){
    console.log('newMessage', data)
});