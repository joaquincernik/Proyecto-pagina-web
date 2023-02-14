const express = require('express')
const router = express.Router()
const albumsController=require("../controller/albumsController")


router.get('/create',albumsController.create)
router.post('/create',albumsController.createProcess)
router.get('/list',albumsController.list)
router.get('/search',albumsController.search)
router.get("/:id",albumsController.details)

module.exports=router