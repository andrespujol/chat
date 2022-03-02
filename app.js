const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const {formatMessage} = require('./utils/utils')
const PORT = process.env.PORT || 8080;
const app = express();
const httServer = http.createServer(app);
const io = socketIo(httServer);

const messages = [];
const users = []
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))


// routes
app.post('/login', (req, res) => {
    const { username } = req.body;
    res.redirect(`./chat?username=${username}`)
})
app.get('/chat', (req,res) => {
    res.sendFile(__dirname + '/public/chat.html')
})

// listen
httServer.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`)
})


// sockets events
const botName = 'Chat bot'
io.on('connection', (socket) => {
    console.log('New client connection');
    socket.emit('messages', [...messages]); //send messages
    socket.on('join-chat', ({ username }) => {
        const newUser = {
            id:socket.id,
            username
        };
        users.push(newUser)

        // welcome user
        socket.emit('chat-message', formatMessage(null, botName, 'Welcome'))

        // broadcast user conection
        socket.broadcast.emit('chat-message', formatMessage(null, botName, `${username} has joined the chat`))
    })
});
