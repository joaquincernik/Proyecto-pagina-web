let db=require("../database/models")
const { validationResult }=require("express-validator")

//para la contrasena
const bcrypt = require('bcryptjs')

const userController={
    register:(req,res)=>{
        res.render("user/userRegister")
    },
    registerProcess:(req,res)=>{
        
        const resultValidations= validationResult(req);
        
        if(resultValidations.errors.length>0){
            console.log(validationResult(req));
            return res.render("user/userRegister",{
                errors:resultValidations.mapped(),
                oldData:req.body
            })
        }
        		//Validamos que no exista el usuario con el mismo mail
        
		db.Users.findAll({
			where: { email: req.body.email }
		})
        .then(userInDB=>{
            if( userInDB.length > 0 ){
                
                return res.render('user/userRegister', {
                    
                    errors: { 
                        email: {
                            msg: 'Este email ya esta registrado'
                        }
                    },
                    oldData: req.body
                })
            }
        })
            console.log(resultValidations);
            let row={
                name:req.body.name,
                password:bcrypt.hashSync(req.body.password, 10),
                address:req.body.address,
                email:req.body.email,
            }
            db.Users.create(row)
                .then(user=>{
                delete user.password
            });
            req.session.userLogged=row
            res.redirect("/")
    },
    login:(req,res)=>{
        res.render("user/userLogin")
    },
    loginProcess:(req,res)=>{
        const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('user/userLogin', {
				/* DEvuelve un objeto literal */
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

        db.Users.findAll({
            where:{email:req.body.email}
        }).then(userInDB=>{
            if(userInDB.length>0){
                let isOkThePassword = bcrypt.compareSync(req.body.password, userInDB.password)
                if( isOkThePassword ){
                    //Se inicicaliza la variable de sesión
                    //Se elimina la propiedad password de la sesión por seguridad
                    delete userInDB.password
                   
                    //Genera una sessión con el usuario logueado, lo que no tiene es el password por seguridad.
                    req.session.userLogged = userInDB
    
                    //Si el usuario solicito recordar su usuario, se genera una cookie.
                   
                        res.cookie('user', req.body.email , { maxAge: (1000 * 60) * 2 })
                        
                    return res.redirect('/')}
                    else{
                        res.render('user/userLogin', {
                            errors: {
                                email: 
                                { 
                                    msg: 'Credenciales inválidas'
                                }
                            }
                        })}
                }//si no encuentra el user
                else{
            
                    res.render('users/login', {
                        errors: {
                            email: 
                            { 
                                msg: 'Credenciales inválidas'
                            }
                        }
                    })
                }
            
        })
    },
}

module.exports=userController