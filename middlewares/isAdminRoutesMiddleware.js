function isAdminRoutesMiddleware (req, res, next){
   
    if(!res.locals.isAdmin){
    return res.redirect("/")  
    }
    next()
}

module.exports = isAdminRoutesMiddleware