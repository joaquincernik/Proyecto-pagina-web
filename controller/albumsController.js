let db=require("../database/models")
const Op = db.Sequelize.Op;
const { validationResult }=require("express-validator")

const albumsController={

    create:(req,res)=>{
        res.render("albums/albumCreate")
        
    },
    createProcess:(req,res)=>{
        const validations=validationResult(req)
        console.log(req.file);
        if(validations.errors.length>0){
            console.log(validations.errors);
            return res.render("albums/albumCreate",{
                errors:validations.mapped(),
                oldData:req.body
            })
        }
        db.Albums.create({
            name:req.body.name,
            cover:req.file.filename,
            date:req.body.date,
            link:req.body.link
        })
        .then(user=>{res.redirect("/")})
    },

    details:function(req,res){
        db.Albums.findByPk(req.params.id,{
            include:[{association:'photos'}]
        })
        .then(function(album){
            
            res.render("albums/albumDetail",{album:album})
        }).catch(err=>{console.log(err)})
    },
    carrousel:function(req,res){
        let begginingPhoto=req.params.begginingPhoto;
        db.Albums.findByPk(req.params.id,{
            include:[{association:'photos'}]
        })
        .then(function(album){
            console.log(begginingPhoto);
            res.render("albums/albumDetailCarrousel",{album:album,begginingPhoto:begginingPhoto})
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
        console.log(req);
        if(req.body.cover!==""){
            db.Albums.update({
            
                name:req.body.name,
                cover:req.file.filename,
                date:req.body.date,
                link:req.body.link

            },{
                where:{
                    album_id:req.params.id
            }});   
        }
        else{
            db.Albums.update({
            
                name:req.body.name,
                date:req.body.date,
                link:req.body.link

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
        const validations=validationResult(req)
        for(i=0;i<req.files.length;i++){
            console.log(req.files[i]);
            db.Photos.create({
                link:req.files[i].originalname,
                album_id:req.params.id
            }) 
        }
      
        
        if(validations.errors.length>0){
            
            return res.redirect("/");}
       
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