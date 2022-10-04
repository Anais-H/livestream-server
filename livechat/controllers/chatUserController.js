import ChatUserModel from "../models/ChatUser.js";


export default {
    createUser : async (req, res) => {
        try {
            // validate data

            const { username } = req.body;
            console.log(username)
            const chatUser = await ChatUserModel.createChatUser(username);
            return res.status(200).json({ success: true, chatUser});

        } catch(error) {
            return res.status(500).json({ success: false, error: error});
        }
    },
}