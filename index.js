var express = require('express'); // Importar express
var socket = require('socket.io'); // Importar socket.io
var cors = require('cors'); // Importar cors

// App setup
var app = express(); // Crear instancia de express

app.use(cors({
    origin: "https://tu-frontend-url.com", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));

// Static files
app.use(express.static('public'));

// Configurar el puerto usando la variable de entorno PORT o 4443 por defecto
var PORT = process.env.PORT || 4443;
var server = app.listen(PORT, function(){
    console.log('listening on port ' + PORT);
});

// Socket setup
var io = socket(server, {
    cors: {
        origin: "https://tu-frontend-url.com",
        methods: ["GET", "POST"]
    }
});

io.on('connection', function(socket){
    console.log('Connected to the super socket', socket.id); // Mensaje de conexión

    socket.on('chat', function(data){
        io.sockets.emit('chat', data); // Emitir mensaje a todos los clientes
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data); // Emitir evento de typing a otros clientes
    });
});
