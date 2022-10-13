
const express=require("express")

const app=express();
app.set('view engine','ejs');
app.set("views","view");

app.get('/',(req,res)=>{
    res.render("index")
})


app.listen(process.env.PORT||3000,(req,res)=>{
    console.log("server is running");
})