import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";

// mongo connection
import "./db/mongo.js";
// init socket configuration
import "./utils/initSocketServer.js";

// routes
import chatUserRouter from "./routes/chatUserRouter.js";
import chatRoomRouter from "./routes/chatRoomRouter.js";
import initSocketServer from "./utils/initSocketServer.js";


const app = express();

const port = process.env.PORT || "3002";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use("/chatUsers", chatUserRouter);
app.use("/chatRooms", chatRoomRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: "API endpoint does not exist"
    });
});

/** Create HTTP server */
const server = http.createServer(app);

/** Create socket connection */
initSocketServer(server);

/** Listen on provided port, on all network interfaces */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
    console.log(`Listening on port:: http://localhost:${port}/`);
});