const path=require('path');
const express =require('express');
const app = express();

const methodOverride= require("method-override")
app.use(methodOverride("_method"))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.set("view engine","ejs")
const port=3000;
//const publicPath= path.join(__dirname,"/public")



const mainRouter=require('./routes/mainRouter')
const albumsRouter=require('./routes/albumsRouter')
const userRouter=require('./routes/userRouter')

app.use("/",mainRouter)
app.use("/albums",albumsRouter)
app.use("/user",userRouter)

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