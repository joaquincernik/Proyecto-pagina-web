function orderMiddleware(req,res,next){
    
   if(!res.locals.isLogged){
res.redirect("/")
    }
next()
}
//if(res.locals.userLogged)
module.exports=orderMiddleware