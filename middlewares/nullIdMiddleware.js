function nullIdMiddleware(req,res,next){
   
if(req.params.id==null){
    res.redirect("/")
}
else{
    next()
}}

module.exports=nullIdMiddleware;