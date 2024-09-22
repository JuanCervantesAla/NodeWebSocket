var express = require('express');//Creating express var just to import express
var socket = require('socket.io');//Imports socket.io

//App setup
var app = express();// app that will allow to set express
var server = app.listen(4443, function(){//setting up the port i want my app listen to

    console.log('listening on request on port 4443');//Message

});

//Static files
app.use(express.static('public'));//Make express to look up for public folder that contains index

//Socket setup
var io = socket(server);//Setting the socket function on the server created, will wait for a connection to a socket
io.on('connection', function(socket){//passing on connection the socket
    console.log('Connected to the super socket', socket.id);//Message

    socket.on('chat',function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing',data);
    });

});