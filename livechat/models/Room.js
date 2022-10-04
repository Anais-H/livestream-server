import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const roomSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        roomName: String,
    },
    {
        timestamp: true,
        collection: "room",
    }
);

roomSchema.statics.createChatUser = async function (roomName) {
    try {
        const room = await this.create({ roomName });
        return room;
    } catch (error) {
        throw error;
    }
}

export default mongoose.model("Room", roomSchema)