const db_exec=require('../models/user')

module.exports={
    doRegister: async function (req, res) {
        const { id, pw } = req.body;
        const registrationResult = await db_exec.register(id, pw);
    
        if (registrationResult.success) {
            res.status(200).json({ success: true, message: "Registration successful" });
        } else {
            res.status(500).json({ success: false, message: "Registration failed", error: registrationResult.error });
        }
    },

    doLogin: async function(req,res){
        const {id,pw}=req.body
        const loginResult=await db_exec.login(id,pw);

        if (loginResult.success) {
            res.status(200).json({ success: true, message: "Login successful" });
        } else {
            res.status(500).json({ success: false, message: "Login failed", error: loginResult.error });
        }

    }
}