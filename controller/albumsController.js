let db=require("../database/models")
const Op = db.Sequelize.Op;

const albumsController={

    create:(req,res)=>{
        res.render("albums/albumCreate")
        
    },
    createProcess:(req,res)=>{
        console.log(req.body);
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
            limit:10
        })
        .then(function(albums){
            
            return res.render("albums/albumsList",{albums})
        }).catch(err=>{console.log(err)})
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
        }
}
module.exports=albumsController;