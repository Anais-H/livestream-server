import MessageModel from "../models/Message.js";

export default {
    getMessagesByRoomId: async (req, res) => {

    },
    
    postMessage: async (req, res) => {
        try {
            // validate data

            const { username, roomId, message } = req.body;
            console.log(username, roomId, message)
            const chatUser = await MessageModel.createChatUser(username);
            return res.status(200).json({ success: true, chatUser});

        } catch(error) {
            return res.status(500).json({ success: false, error: error});
        }
    },
}