const express = require('express')
const router = express.Router()
const albumsController=require("../controller/albumsController")
const albumMiddleware=require("../middlewares/albumMiddleware")
const addPhotoMiddleware=require("../middlewares/addPhotoMiddleware")
const isAdminRoutesMiddleware=require("../middlewares/isAdminRoutesMiddleware")
const nullIdMiddleware=require("../middlewares/nullIdMiddleware")
const upload=require("../middlewares/coverMulterMiddleware")


//crear albums
router.get('/admin/create',isAdminRoutesMiddleware,albumsController.create)
router.post('/admin/create',isAdminRoutesMiddleware,upload.single('cover'),albumMiddleware,albumsController.createProcess)

//admin
router.get("/admin/adminView",isAdminRoutesMiddleware,albumsController.listAdmin)
//anadir fotos
router.get("/admin/create/addPhoto/:id",isAdminRoutesMiddleware,albumsController.addPhoto)
router.post("/admin/create/addPhoto/:id",isAdminRoutesMiddleware,upload.array('images'),addPhotoMiddleware,albumsController.addPhotoProcess)

//editar
router.get("/admin/update/:id",isAdminRoutesMiddleware,albumsController.update)
router.post("/admin/update/:id",isAdminRoutesMiddleware,upload.single('cover'),albumsController.updateProcess)

//borrar
router.post("/admin/delete/:id",isAdminRoutesMiddleware,albumsController.delete)
//borrar foto
router.get("/admin/delete/deletePhoto/:id",isAdminRoutesMiddleware,albumsController.deletePhoto)
router.post("/admin/delete/photo/:id",isAdminRoutesMiddleware,albumsController.deletePhotoProcess)

router.get('/list',albumsController.list)
router.get('/search',albumsController.search)
router.get("/:id",albumsController.details)
router.get("/:id/carrousel/:begginingPhoto",albumsController.carrousel)
module.exports=router