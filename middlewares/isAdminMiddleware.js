//Valida si hay un usuario en sesión y si es un admin

function isAdminMiddleware (req, res, next){
    res.locals.isAdmin=false;
    //console.log(res.locals);
    
    if(req.session.userLogged){
       // console.log(req.session.userLogged);
        if(req.session.userLogged.id == 3){
            
            res.locals.isAdmin=true;
            //return res.redirect('/')
        }
        
    }
    next()
}

module.exports = isAdminMiddleware