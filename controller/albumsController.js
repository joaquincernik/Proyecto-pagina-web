let db=require("../database/models")
const Op = db.Sequelize.Op;

const albumsController={

    create:(req,res)=>{
        res.render("albums/albumCreate")
        
    },
    createProcess:(req,res)=>{
        
        db.Albums.create({
            name:req.body.name,
            cover:req.body.cover,
            date:req.body.date
        });
        res.redirect("/")
    },

    details:function(req,res){
        db.Albums.findByPk(req.params.id,{
            include:[{association:'photos'}]
        })
        .then(function(album){
            
            res.render("albums/albumDetail",{album:album})
        }).catch(err=>{console.log(err)})
    },

    list:(req,res)=>{
     
       db.Albums.findAll({
            order:[
                ['date','DESC']
            ],
            
        })
        .then(function(albums){
            
            return res.render("albums/albumsList",{albums})
        }).catch(err=>{console.log(err)})
        },

    update:(req,res)=>{
        let albumRequest=db.Albums.findByPk(req.params.id)
        let photoRequest=db.Photos.findAll({
            where:{
                album_id:req.params.id
            }
        })

        Promise.all([albumRequest,photoRequest])
            .then(function([album,photos]){
                res.render("albums/albumUpdate",{album:album,photos:photos})
            })
    },
    updateProcess:(req,res)=>{
        
        if(req.body.cover!==""){
            db.Albums.update({
            
                name:req.body.name,
                cover:req.body.cover,
                date:req.body.date
            },{
                where:{
                    album_id:req.params.id
            }});   
        }
        else{
            db.Albums.update({
            
                name:req.body.name,
                date:req.body.date
            },{
                where:{
                    album_id:req.params.id
            }});   
        }
        
        res.redirect("/")
    },
    delete:(req,res)=>{
        db.Albums.destroy({
            where:{
                album_id:req.params.id
            }
        })
        res.redirect("/")
    },
    search:(req,res)=>{
        
        let toSearch=req.query.search
        db.Albums.findAll({
            where:{
                name:{[Op.like]:'%'+req.query.search+'%'}
            }
        })
        .then(function(albums){
            
            return res.render("albums/albumSearch",{albums,toSearch})
        }).catch(err=>{console.log(err)})
        },

    addPhoto:(req,res)=>{
        db.Albums.findByPk(req.params.id,{
            include:[{association:'photos'}]})
            .then(function(album){
                
                res.render("albums/albumAddPhoto",{album})
            }).catch(err=>{console.log(err)})
    },
    addPhotoProcess:(req,res)=>{
        let images=[]
        
        images=req.body.images
       
        if(Array.isArray(req.body.images)){
            for(i=0;i<images.length;i++){
                db.Photos.create({
                    link:images[i],
                    album_id:req.params.id
                })
            }
        }
        else{
                db.Photos.create({
                    link:images,
                    album_id:req.params.id
                }) 
        }
       
        res.redirect("/albums/"+req.params.id) 
    },
    deletePhoto:(req,res)=>{
        db.Photos.findAll({
            where:{
                album_id:req.params.id
            }
        })
            .then(function(photos){
                res.render("albums/albumDeletePhoto",{photos:photos,id:req.params.id})
            }).catch(err=>{console.log(err)})
    },
    deletePhotoProcess:(req,res)=>{
        
        db.Photos.destroy({
            where:{
                photo_id:req.body.button
            }
        }).then(res.redirect("/")) 
    },
    listAdmin:(req,res)=>{
        
           db.Albums.findAll({
                order:[
                    ['date','DESC']
                ],
                
            })
            .then(function(albums){
                
                return res.render("albums/adminView",{albums})
            }).catch(err=>{console.log(err)})
            },
    
    
}
module.exports=albumsController;