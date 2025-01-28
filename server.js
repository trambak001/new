const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let messages = [];

io.on('connection', (socket) => {
    console.log('New client connected');

    // Send existing messages to the new client
    socket.emit('loadMessages', messages);

    socket.on('sendMessage', (message) => {
        messages.push(message);
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
