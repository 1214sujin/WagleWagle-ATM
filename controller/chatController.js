const db_exec=require('../models/chat')
let chat_list={}

module.exports={
    chat: async function (req, res) {
        try {
            let chat_no = req.query.id;
            let message = req.query.message;
    
            // Check if chat_no already exists in chat_list, if not, create an empty array
            if (!chat_list[chat_no]) {
                chat_list[chat_no] = [];
            }
    
            // Push the new message to the chat list for the specified chat_no
            chat_list[chat_no].push(message);
    
            console.log(chat_list);
    
            res.status(200).json({
                success: true,
                message: {
                    chat_no: chat_no,
                    c_message: chat_list[chat_no]
                }
            });
        } catch (error) {
            console.error("Error in chat function:", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    },
	main: async function (req, res) {
		const { user } = {user: '1111'}//req.session
		const { last_chat } = {last_chat: 27}//req.body
        const result = await db_exec.main(user, last_chat);
    
        if (result.success) {
            res.status(200).json({ success: true, message: "Registration successful",
								   chatList: result.chatList, last_chat: result.last_chat });
        } else {
            res.status(500).json({ success: false, message: "Registration failed", error: registrationResult.error });
        }
    }
}