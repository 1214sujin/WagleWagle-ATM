const express=require("express")
const controller=require("../controller/userController")
const router=express.Router()

router.post("/register",controller.doRegister)
router.post("/login",controller.doLogin)

module.exports=router