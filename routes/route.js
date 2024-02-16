const express=require("express")
const userController=require("../controller/userController")
const router=express.Router()

router.post("/register",userController.doRegister)
router.post("/login",userController.doLogin)
router.post("/logout",userController.doLogout)
router.post("/chat")

module.exports=router