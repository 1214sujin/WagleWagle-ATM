const express=require("express")
const controller=require("../controller/userContoller")
const router=express.Router()

router.get("/")

router.post("/register",controller.doRegister)

module.exports=router