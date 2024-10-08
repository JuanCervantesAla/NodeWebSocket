//Make connection
const socket = io(); // Conectar al mismo origen

//Query dom
var message =  document.getElementById('message');
    handle =  document.getElementById('handle'),
    btn =  document.getElementById('send'),
    output =  document.getElementById('output'),
    feedback = document.getElementById('feedback');

//Emit events
btn.addEventListener('click',function(){
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});


//Listen for events
socket.on('chat',function(data){
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});


//Socket
socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
});