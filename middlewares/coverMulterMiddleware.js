const multer = require('multer')
const path=require("path")
//multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        //console.log(file);
        callBack(null, file.originalname  )
    }
})

var upload = multer({
    storage: storage
});
module.exports=upload