const express = require('express')
const router = express.Router()
const albumsController=require("../controller/albumsController")

//crear albums
router.get('/create',albumsController.create)
router.post('/create',albumsController.createProcess)

//anadir fotos
router.get("/create/addPhoto/:id",albumsController.addPhoto)
router.post("/create/addPhoto/:id",albumsController.addPhotoProcess)

//editar
router.get("/update/:id",albumsController.update)
router.post("/update/:id",albumsController.updateProcess)

//borrar
router.post("/delete/:id",albumsController.delete)
//borrar foto
router.get("/delete/deletePhoto/:id",albumsController.deletePhoto)
router.post("/delete/photo/:id",albumsController.deletePhotoProcess)

router.get('/list',albumsController.list)
router.get('/search',albumsController.search)
router.get("/:id",albumsController.details)

module.exports=router