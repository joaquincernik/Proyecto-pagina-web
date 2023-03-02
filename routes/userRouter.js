const express = require('express')
const router = express.Router()
const userController=require("../controller/userController")
const registerMiddleware=require("../middlewares/registerMiddleware")
const loginMiddleware=require("../middlewares/loginMiddleware")

//register
router.get("/register",userController.register)
router.post("/register",registerMiddleware,userController.registerProcess)

//login
router.get("/login",userController.login)
router.post("/login",loginMiddleware,userController.loginProcess)

module.exports=router;