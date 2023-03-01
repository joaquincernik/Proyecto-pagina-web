const express = require('express')
const router = express.Router()
const userController=require("../controller/userController")
const registerMiddleware=require("../middlewares/registerMiddleware")

router.get("/register",userController.register)

module.exports=router;