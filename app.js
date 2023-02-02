

const path=require('path');
const express =require('express');
const app =express();
app.use("view engine","ejs")
const port=3000;
const publicPath= path.join(__dirname,"/public")
const mainRouter=require("./routes/mainRouter")


app.use("/",mainRouter)
/*app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/index.html"));
})*/

app.listen(port,()=>{
        console.log("Server running");
})