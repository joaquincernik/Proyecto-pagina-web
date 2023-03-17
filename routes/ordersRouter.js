const express=require('express')
const router=express.Router();
const orderController=require('../controller/orderController');
const orderMiddleware=require("../middlewares/orderMiddleware")

router.get('/create/:id',orderMiddleware,orderController.create)
router.post('/create/:id',orderController.createProcess)

router.get('/list',orderController.listOrders)

router.post('/delete/:id',orderController.delete)
module.exports=router