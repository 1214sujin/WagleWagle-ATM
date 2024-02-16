const db_exec=require('../models/user')

module.exports={
    doRegister: async function (req, res) {
        const { id, pw, name } = req.body;
        const registrationResult = await db_exec.register(id, pw, name);
    
        if (registrationResult.success) {
            res.status(200).json({ success: true, message: "Registration successful" });
        } else {
            res.status(500).json({ success: false, message: "Registration failed", error: registrationResult.error });
        }
    }
}