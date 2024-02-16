const db_exec=require('../models/chat')
let chat_list={}

module.exports={
	chat: async function (req, res) {
		const { user } = req.session
        const { descript } = req.body
        const result = await db_exec.chat(user, descript);
    
        if (result.success) {
            res.status(200).json({ success: true, message: "Registration successful",
								   answer: result.answer, feedback: result.feedback });
        } else {
            res.status(500).json({ success: false, message: "Registration failed", error: registrationResult.error });
        }
    },
	main: async function (req, res) {
		const { user } = req.session
		const { last_chat } = req.body
        const result = await db_exec.main(user, last_chat);
    
        if (result.success) {
            res.status(200).json({ success: true, message: "Registration successful",
								   chatList: result.chatList, last_chat: result.last_chat });
        } else {
            res.status(500).json({ success: false, message: "Registration failed", error: registrationResult.error });
        }
    }
}