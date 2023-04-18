let db=require("../database/models")

const orderController={

    create:(req,res)=>{
        db.Albums.findByPk(req.params.id,{
            include:[{association:'photos'}]
        })
        .then(function(album){
            
            res.render("order/listPhotos",{album:album})
        }).catch(err=>{console.log(err)})
       
    },
    createProcess:(req,res)=>{
        db.Orders.create({
            name:res.locals.userLogged.name,
            address:res.locals.userLogged.address,
            email:res.locals.userLogged.email,
            photos:req.body.photos,
        }) .then(function(){
           
            res.redirect("/")
        }).catch(err=>{console.log(err)})
    },

    listOrders:(req,res)=>{
        
        db.Orders.findAll()
        .then(function(orders){
           
            return res.render("order/ordersList",{orders})
        }).catch(err=>{console.log(err)})
    },
    delete:(req,res)=>{
        db.Orders.destroy({
            where:{
                id:req.params.id,
            }
        }).then(res.redirect("/orders/list"))
    }
}

module.exports=orderController