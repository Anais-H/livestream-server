import { Server } from "socket.io";

// TODO
// Corriger la gestion du nombre d'utilisateurs dans une room

export default function(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });

    const users = [];

    io.on('connection', (socket) => {
        console.log("Connection from id : ", socket.id);

        
        socket.on('join', (room) => {
            socket.join(room);
            const nbViewersInRoom = io.sockets.adapter.rooms.get(room).size;
            socket.to(room).emit("nb_clients", nbViewersInRoom);
            socket.emit("nb_clients", nbViewersInRoom);
            console.log("User id : " + socket.id + " joined room : " + room + " (" + nbViewersInRoom + ")");

        });

        socket.on('set_username', (username) => {
            // only user with a username can post messages in a room
            console.log("User id : " + socket.id + " chose username : " + username);
        });
        
        
        socket.on('post_message', (data) => {
            console.log(data.username + " sent to " + data.room + " : " + data.message);
            socket.to(data.room).emit('new_message', data);
        });

        socket.on("disconnecting", () => {
            console.log("Socket id " + socket.id + " disconnected.");
            socket.rooms.forEach((room) => {
                socket.leave(room);
                let nbClients = io.sockets.adapter.rooms.get(room)?.size;
                socket.to(room).emit("nb_clients", nbClients);
                console.log("room : " + room + " (" + nbClients + ")");
            });
        });
    });

    io.engine.on("connection_error", (err) => {
        console.log(err.req);      // the request object
        console.log(err.code);     // the error code, for example 1
        console.log(err.message);  // the error message, for example "Session ID unknown"
        console.log(err.context);  // some additional error context
      });
}



class WebSockets {

    

    connection(client) {
        // event fired when the chat room is disconnected
        client.on("disconnected", () => {
            this.users = this.users.filter((user) => user.socketId !== client.id);
        });

        // ad identity of user mapped to socket id
        client.on("identity", (userId) => {
            this.users.push({
                socketId: client.id,
                userId: userId,
            });
        });

        // subscribe person to chat and other user as well
        client.on("subscribe", (room) => {
            client.join(room);
        });

        // leave a chat room
        client.on("unsubscribe", (room) => {
            client.leave(room);
        });
    }
}