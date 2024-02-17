const db_exec=require('../models/chat')

module.exports={
        chat: async function (req, res) {
        const { user } = req.session

        if(!req.session.user){
                res.status(401).json({success:false, message:"get out"})
                return 0
        }

        const { descript } = req.body
        const result = await db_exec.chat(user, descript);

        if (result.success) {
            res.status(200).json({ success: true, message: "Registration successful",
                                                                   answer: result.answer, feedback: result.feedback });
        } else {
            res.status(500).json({ success: false, message: "Registration failed", error: result.error });
        }
    },
        main: async function (req, res) {
        const { user } = req.session

        if(!req.session.user){
                res.status(401).json({success:false, message:"get out"})
                return 0
        }

        const { last_chat } = req.body
        const result = await db_exec.main(user, last_chat);

        if (result.success) {
            res.status(200).json({ success: true, message: "Registration successful",
                                                                   chatList: result.chatList, last_chat: result.last_chat });
        } else {
            res.status(500).json({ success: false, message: "Registration failed", error: result.error });
        }
    }
}