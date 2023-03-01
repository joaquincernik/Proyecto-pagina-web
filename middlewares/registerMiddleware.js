const {body}=require("express-validator")

const registerMiddleware=[
    body("name").notEmpty().withMessage("Completa el campo nombre").bail(),
    body("email").notEmpty().isEmail().withMessage("Completa el campo email").bail(),
    body("address").notEmpty().withMessage("Completa la direccion donde recibiras las fotos").bail(),
    body("password").notEmpty().withMessage("Elige una contrasena").bail(),
]
module.exports=registerMiddleware