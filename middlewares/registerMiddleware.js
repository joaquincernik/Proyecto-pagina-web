const {body}=require("express-validator")

const registerMiddleware=[
    body("name").notEmpty().withMessage("Completa el campo nombre").bail(),

    body("email").notEmpty().withMessage("Completa el campo correo electronico")
    .isEmail().withMessage("Completa el campo email").bail(),
    body("address").notEmpty().withMessage("Completa la direccion donde recibiras las fotos").isLength({ min: 2 }).bail(),
    body("password").notEmpty().withMessage("Elige una contrasena")
    .isLength({ min: 6 }).withMessage("Debe tener un minimo de 6 caracteres").bail(),
]
module.exports=registerMiddleware