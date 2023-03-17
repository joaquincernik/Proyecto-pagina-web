const path=require('path');
const express =require('express');
const app = express();
const multer = require('multer')

const methodOverride= require("method-override")
app.use(methodOverride("_method"))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.set("view engine","ejs")


//multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});
//cookie y session
const session = require('express-session')
const cookies = require('cookie-parser')
app.use(cookies())
app.use(session({
    secret: 'Es una frase secreta',
    resave: false,
    saveUninitialized: false
}))
const userLoggedMiddleware=require("./middlewares/userLoggedMiddleware")
const isAdminMiddleware=require("./middlewares/isAdminMiddleware")

app.use(userLoggedMiddleware)
app.use(isAdminMiddleware)

const port=3000;
//const publicPath= path.join(__dirname,"/public")


const mainRouter=require('./routes/mainRouter')
const albumsRouter=require('./routes/albumsRouter')
const userRouter=require('./routes/userRouter');
const orderRouter=require('./routes/ordersRouter');


app.use("/",mainRouter)
app.use("/albums",albumsRouter)
app.use("/user",userRouter)
app.use("/orders",orderRouter)

//errors
app.use((req,res,next)=>{
    res.status(404).render("errors/not-found")
    next();
})

/*app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/index.html"));
})*/

app.listen(port,()=>{
        console.log("Server running");
})