const express = require('express');
const socket = require('socket.io');

// Declara una app en express
const app = express();
const port = process.env.PORT || 3000;
// Corre el servidor por cierto puerto
const server = app.listen(port);
// Ruta de donde express va a servir la página web
app.use(express.static('public'));

console.log("My socket server is running");

const io = socket(server);


// Evento de conexión
function newConnection(socket) {

    function rojoData(data) {
        console.log("rojo:", data);
    }

    function amarilloData(data) {
        console.log("amarillo", data);
    }

    function verdeData(data) {
        console.log("verde", data);
    }

    socket.on('rojo', rojoData);
    socket.on('amarillo', amarilloData);
    socket.on('verde', verdeData);

}

io.sockets.on('connection', newConnection);