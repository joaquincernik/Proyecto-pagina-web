let db=require("../database/models")
const mainController={
    index:(req,res)=>{
        
        db.Albums.findAll({
            order:[
                ['date','DESC']
            ],
            limit:8
        })
        .then(function(albums){
            
            return res.render("index",{albums})
        }).catch(err=>{console.log(err)})}

       // res.render("index");
    
}
module.exports = mainController