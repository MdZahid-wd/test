const jwt=require('jsonwebtoken');
const bodyParser=require("body-parser");
const express=require("express")

const app=express();
app.set('view engine','ejs');
app.set("views","view");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));


app.get('/',async(req,res)=>{
    
    
    const token=await jwt.sign({name:"zahid"},"84f0jg82bd99kwmo00e02eko2kmmnfdkjf999399330ndnndnndkirjjsnf94u9499ur8rr99r99r9900f",{expiresIn:'1h'});
    console.log('........ttttttttt.......')
            
                
                res.cookie('jwts',token,{expires:new Date(Date.now()+60*60*1000),httpOnly:true});
                res.render("index")
})
const auth=async(req,res,next)=>{
    try{
        const cookies=req.headers.cookie;
        var token=0;
        if(cookies==null){
            
           res.status(404)
            res.send("no authentication")
            

        }
        else{
            
            const cookiesArray=cookies.split('; ');
            console.log(cookiesArray.length);
        
            for(i=0;i<cookiesArray.length;i++){
                var keyes=cookiesArray[i].split('=')[0];
                console.log(keyes);
                if(keyes=='jwts'){
                    token=cookiesArray[i].split('=')[1];
                }
            }
            if(token==0){
                res.status(404)
            res.send("no authentication")
            }
            else{
                try{
                    const verifyUser=jwt.verify(token,'84f0jg82bd99kwmo00e02eko2kmmnfdkjf999399330ndnndnndkirjjsnf94u9499ur8rr99r99r9900f');
                    console.log(verifyUser.name)
                    
                    next()
                   }catch(e){
                        console.log(e);
                        res.status(404),send(e);
                   } 
            }
        
           
        }      
    }
    catch(e){
res.status(401),send(e);
    }
}
    
     

app.get("/login",auth,(req,res)=>{
    res.render("secret");
})


app.listen(process.env.PORT||3000,(req,res)=>{
    console.log("server is running");
})