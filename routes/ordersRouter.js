const express=require('express')
const router=express.Router();
const orderController=require('../controller/orderController');
const orderMiddleware=require("../middlewares/orderMiddleware");
const isAdminRoutesMiddleware=require("../middlewares/isAdminRoutesMiddleware")


router.get('/create/:id',orderController.create)
router.post('/create/:id',orderController.createProcess)

router.get('/list',isAdminRoutesMiddleware,orderController.listOrders)
router.post('/delete/:id',orderController.delete)
module.exports=router