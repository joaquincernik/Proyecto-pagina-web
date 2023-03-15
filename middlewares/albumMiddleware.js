const {body}=require("express-validator")

const albumMiddleware=[
    body("name").notEmpty().withMessage("Completa el campo nombre").bail(),

    body("date").notEmpty().withMessage("Completa el campo correo electronico")
    .isDate().withMessage("Completa el campo fecha").bail(),
   body("cover").notEmpty().withMessage("Elige una foto de portada").bail(),

]
module.exports=albumMiddleware