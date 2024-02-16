const db_exec=require('../model/chat')

module.exports={
    chat: async function (req, res) {
		const { uid } = req.session
        const { descript } = req.body
        const result = await db_exec.chat(uid, descript);
    
        if (result.success) {
            res.status(200).json({ success: true, message: "Registration successful", answer: result.answer });
        } else {
            res.status(500).json({ success: false, message: "Registration failed", error: registrationResult.error });
        }
    }
}