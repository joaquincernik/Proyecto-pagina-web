const {body}=require("express-validator")

const addPhotoMiddleware=[
    body("images").notEmpty().withMessage("Agrega una/s foto/s").bail(),
]
module.exports=addPhotoMiddleware