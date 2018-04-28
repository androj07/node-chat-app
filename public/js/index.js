const socket = io();
socket.on('connect', function(){
    console.log('Connected to server');
});

socket.on('disconnect', function(){
    console.log('disconnected from server')
});

socket.on('newMessage', function(data,callback){
    console.log('newMessage', data);
    const li = $('<li></li>');
    li.text(`${data.from}: ${data.text}`);
    $('#messages').append(li);
    if(callback && callback.call) {
        callback()
    }
});

$('#message-form').on('submit',function(e){
    e.preventDefault();
    const from = $('[name=from]').val();
    const text = $('[name=message]').val();
    socket.emit('createMessage', {
        from,text
    },function (data){
        console.log('Message delivered');
        console.log(data);
    });

    $('[name=message]').val('');

});