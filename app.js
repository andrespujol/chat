const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 8080;
const app = express();
const httServer = http.createServer(app);
const io = socketIo(httServer);

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
    ];

app.use(express.static('./public'))


httServer.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`)
})

io.on('connection', (socket) => {
    console.log('New client connection');
    socket.emit('messages', [...messages]);
});
