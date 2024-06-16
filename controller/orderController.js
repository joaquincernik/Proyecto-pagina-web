let db=require("../database/models")

const orderController={

    create:(req,res)=>{
        db.Albums.findByPk(req.params.id,{
            include:[{association:'photos'}]
        })
        .then(function(album){
            let id='';
            if(album.link!=null){
                let index=album.link.indexOf('=')+1;
                 id= album.link.slice(index);
            }
           
            
            res.render("order/listPhotos",{album:album,id:id})
        }).catch(err=>{console.log(err)})
       
    },
    createProcess:(req,res)=>{
        db.Orders.create({
            name:res.locals.userLogged.name,
            address:res.locals.userLogged.address,
            email:res.locals.userLogged.email,
            photos:req.body.photos,
            album_id:req.params.id
        }) .then(function(){
           
            res.redirect("/")
        }).catch(err=>{console.log(err)})
    },

    listOrders:(req,res)=>{
        
        db.Orders.findAll(
           {include:[{association:'albums'}]}
        )
        .then(function(orders){
           console.log(orders);
            return res.render("order/ordersList",{orders})
        }).catch(err=>{console.log(err)})
    },
    delete:(req,res)=>{
        db.Orders.destroy({
            where:{
                id:req.params.id,
            }
        }).then(res.redirect("/orders/list"))
    },
    listMyOrders:(req,res)=>{
       
        if(!res.locals.isLogged){
            return res.render("order/misOrdenes",{orders:''})
        }else{
        db.Orders.findAll( {include:[{association:'albums'}]},{
           where:{
            email:res.locals.userLogged.email
           }})
           .then(function(orders){
            
            return res.render("order/misOrdenes",{orders:orders})
           })}  } 
}

module.exports=orderController