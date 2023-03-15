const express = require('express')
const router = express.Router()
const albumsController=require("../controller/albumsController")
const albumMiddleware=require("../middlewares/albumMiddleware")
const addPhotoMiddleware=require("../middlewares/addPhotoMiddleware")
const isAdminRoutesMiddleware=require("../middlewares/isAdminRoutesMiddleware")
const multer = require('multer')
const path=require("path")
//multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        console.log(file);
        callBack(null, file.originalname  )
    }
})

var upload = multer({
    storage: storage
});

//crear albums
router.get('/admin/create',isAdminRoutesMiddleware,albumsController.create)
router.post('/admin/create',isAdminRoutesMiddleware,upload.single('image'),albumMiddleware,albumsController.createProcess)

//admin
router.get("/admin/adminView",isAdminRoutesMiddleware,albumsController.listAdmin)
//anadir fotos
router.get("/admin/create/addPhoto/:id",isAdminRoutesMiddleware,albumsController.addPhoto)
router.post("/admin/create/addPhoto/:id",isAdminRoutesMiddleware,addPhotoMiddleware,albumsController.addPhotoProcess)

//editar
router.get("/admin/update/:id",isAdminRoutesMiddleware,albumsController.update)
router.post("/admin/update/:id",isAdminRoutesMiddleware,albumsController.updateProcess)

//borrar
router.post("/admin/delete/:id",isAdminRoutesMiddleware,albumsController.delete)
//borrar foto
router.get("/admin/delete/deletePhoto/:id",isAdminRoutesMiddleware,albumsController.deletePhoto)
router.post("/admin/delete/photo/:id",isAdminRoutesMiddleware,albumsController.deletePhotoProcess)

router.get('/list',albumsController.list)
router.get('/search',albumsController.search)
router.get("/:id",albumsController.details)

module.exports=router