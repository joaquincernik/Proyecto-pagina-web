let db=require("../database/models")
async function userLoggedMiddleware(req,res,next){
     //1. Permite buscar si existe una cookie, si existe habilita la sessión.
    //2. Pregunta si se tiene una sessión.

    //Si se tiene una cookie o sessión habilitada, el sistema genera una variable local en la respuesta donde define res.locals.isLogged = true y userLogged    
    let userEmailInCookie = undefined
    let userFromCookie = undefined
    
    if(req.cookies.user != undefined){
        
        userEmailInCookie = req.cookies.user

        userFromCookie = await db.Users.findAll({
			where: { email: userEmailInCookie }
		});

        delete userFromCookie.password
    }
       
        if( userFromCookie){
            req.session.userLogged = userFromCookie[0]
        }
      //Variable de control de usuario legueado.
      res.locals.isLogged = false
     
      if(req.session && req.session.userLogged){
          res.locals.isLogged = true
          //console.log(req.session.userLogged);
          res.locals.userLogged = req.session.userLogged
      }
  
    
    next()
}
module.exports=userLoggedMiddleware