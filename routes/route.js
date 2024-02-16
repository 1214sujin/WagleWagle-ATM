const express=require("express")
const userController=require("../controller/userController")
const chatController = require("../controller/chatController")
const router=express.Router()

router.post("/register", userController.doRegister)
router.post("/login",userController.doLogin)
router.post("/logout",userController.doLogout)

router.post("/main", chatController.main)
router.post("/chat", chatController.chat)

module.exports=router