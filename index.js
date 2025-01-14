// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Set up Express and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" folder
app.use(express.static(__dirname + '/public'));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected.');

    // Listen for "text-changed" events from the client
    socket.on('text-changed', (text) => {
        // Broadcast the updated text to all other clients
        socket.broadcast.emit('text-update', text);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
