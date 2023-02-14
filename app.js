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

app.use("/",mainRouter)
app.use("/albums",albumsRouter)
/*app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/index.html"));
})*/

app.listen(port,()=>{
        console.log("Server running");
})