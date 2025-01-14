// Select the text editor (textarea) element
const editor = document.querySelector('#editor');

// Establish a connection to the server
const socket = io(); // Connects to the Socket.io server

// Send text changes to the server when the user types
editor.addEventListener('input', () => {
    const currentText = editor.value; // Get the current text from the textarea
    socket.emit('text-changed', currentText); // Send updated text to the server
});

// Update the editor when new text is received from the server
socket.on('text-update', (newText) => {
    editor.value = newText; // Update the textarea with the received text
});
