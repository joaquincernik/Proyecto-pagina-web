let db=require("../database/models")
const mainController={
    index:(req,res)=>{
       //si no esta logeado
        if(!res.locals.isLogged){
            db.Albums.findAll({
                order:[
                    ['date','DESC']
                ],
                limit:8
            })
            .then(function(albums){
                let orders=[];
                return res.render("index",{albums,orders})
            }).catch(err=>{console.log(err)})}
    
            
          else{
              let albumsRequest=db.Albums.findAll({
            order:[
                ['date','DESC']
            ],
            limit:8
        })
        let orderRequest=db.Orders.findAll({
           where:{
            email:res.locals.userLogged.email
           }})

           Promise.all([albumsRequest,orderRequest])
           .then(function([albums,orders]){
            
            return res.render("index",{albums:albums,orders:orders})
           })}  
          
            
           
        }
       
       // res.render("index");
    
}
module.exports = mainController