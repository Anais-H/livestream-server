import express from "express";

//controllers
import chatController from "../controllers/chatRoomController.js";

const router = express.Router();

router
    .get('/:roomId', chatController.getMessagesByRoomId)
    .post('/:roomId/message', chatController.postMessage);

export default router;