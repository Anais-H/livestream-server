import express from "express";
import chatUserController from "../controllers/chatUserController.js";

const router = express.Router();

router
    .post("/createChatUser", chatUserController.createUser);

export default router;