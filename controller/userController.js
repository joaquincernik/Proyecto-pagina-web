let db=require("../database/models")
const {validationResult}=require("express-validator")

//para la contrasena
//const bcrypt = require('bcryptjs')

const userController={
    register:(req,res)=>{
        res.render("user/userRegister")
    },
    registerProcess:(req,res)=>{
        
        let errors= validationResult(req);
        res.send(errors)

        /*
            console.log(req.body);
            db.Users.create({
                name:req.body.name,
                password:req.body.password,
                address:req.body.address,
                email:req.res.email,
            });
            res.redirect("/")*/
    }
}

module.exports=userController