import { WebSocketServer } from "ws";
import { randomUUID } from "node:crypto";

const connectionMap = new Map();

const webSocketServer = new WebSocketServer({ port: 1234 });

webSocketServer.on("connection", connection => {
    console.log("New connection established");

    const metadata = { id: randomUUID(), color: Math.random() * 360 };
    connectionMap.set(connection, metadata)

    connection.on("message", message => {
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        const currentMetadata = connectionMap.get(connection);
        console.log(`Updating metadata for ${currentMetadata.id}`);
        const updatedMetadata = {...currentMetadata, position: {x: parsedMessage.x, y: parsedMessage.y}};
        connectionMap.set(connection, updatedMetadata);
        broadcastToPeerConnections(connection, updatedMetadata);
    });

    connection.on("close", ()=>{
        const connection = this;
        connectionMap.delete(connection);
    })
}) 

function broadcastToPeerConnections(fromConnection, message){
    connectionMap.keys().forEach(connection => {
        if (connection !== fromConnection) {
            connection.send(JSON.stringify(message));
        }
    });
}
