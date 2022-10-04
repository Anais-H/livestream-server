import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const messageSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        username: String,
        message: String,
        roomId: String,
    },
    {
        timestamp: true,
        collection: "message",
    }
);

messageSchema.statics.getMessagesByRoomId = async function (roomId) {
    try {
        const messages = await this.find({_id: roomId}).limit(20);
        return messages;
    } catch (error) {
        throw error;
    }
}

messageSchema.statics.postMessage = async function (username, roomId, message) {
    try {
        const messageObj = await this.create({ username, roomId, message });
        return messageObj;
    } catch (error) {
        throw error;
    }
}

export default mongoose.model("Message", messageSchema)