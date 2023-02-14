let db=require("../database/models")

//para la contrasena
//const bcrypt = require('bcryptjs')

const userController={
    register:(req,res)=>{
        res.render("user/userRegister")
    },
    registerProcess:(req,res)=>{
        
            console.log(req.body);
            db.Users.create({
                name:req.body.name,
                password:req.body.password,
            });
            res.redirect("/")
    }
}

module.exports=userController