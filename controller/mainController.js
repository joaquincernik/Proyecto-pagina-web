let db=require("../database/models")
const mainController={
    index:(req,res)=>{
        db.Photo.findAll()
        .then(function(photos){
            console.log(photos)
            return res.render("index",{photos:photos})
        }).catch(err=>{console.log(err)})
       // res.render("index");
    }
}
module.exports = mainController