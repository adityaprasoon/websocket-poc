let socket;
const peerCursorMap = new Map();
document.addEventListener('DOMContentLoaded', () => {
    // Connect to the WebSocket server
    createWebSocketConnection();
    document.addEventListener('mousemove', (event) => {
        const mouseData = {x: event.clientX, y: event.clientY};
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(mouseData));
        } else {
            console.error('WebSocket is not open. Cannot send data.');
        }
    });
});

function createWebSocketConnection() {
    socket = new WebSocket('ws://localhost:1234');

    socket.addEventListener('open', () => {
        console.log('WebSocket connection established');
    });

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        console.log('Message from server:', data);
        peerCursorMap.set(data.id, data);
        positionPeerCursors();
    });

    socket.addEventListener('close', () => {
        console.log('WebSocket connection closed');
        peerCursorMap.delete(data.id);
    });

    socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
    });
}

function positionPeerCursors() {
    const cursorContainer = document.getElementById('cursor-container');
    cursorContainer.innerHTML = ''; // Clear previous cursors

    peerCursorMap.forEach((data, id) => {
        const cursorElement = document.createElement('div');
        cursorElement.className = 'peer-cursor';
        cursorElement.style.display = 'inline';
        cursorElement.style.position = 'fixed';
        cursorElement.style.left = `${data.position.x}px`;
        cursorElement.style.top = `${data.position.y}px`;
        cursorElement.style.backgroundColor = `hsl(${data.color}, 100%, 50%)`;
        cursorElement.textContent = id; // Display the ID for debugging
        cursorContainer.appendChild(cursorElement);
    });
}