import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const chatUserSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        username: String,
    },
    {
        timestamp: true,
        collection: "chatUser",
    }
);

chatUserSchema.statics.createChatUser = async function (username) {
    try {
        const chatUser = await this.create({ username });
        return chatUser;
    } catch (error) {
        throw error;
    }
}

export default mongoose.model("ChatUser", chatUserSchema)