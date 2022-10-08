const express=require("express");
const app=express();
const fs=require("fs")
const path=require("path")
const bodyParser=require("body-parser");
const cors=require("cors")
const mongoose=require("mongoose");
// mongoose.connect("mongodb://localhost/instapost")
mongoose.connect("mongodb+srv://Harsha:harsha%401234@cluster0.ohltzw6.mongodb.net/?retryWrites=true&w=majority://Harsha:harsha@1234@cluster0.ohltzw6.mongodb.net/instapost?retryWrites=true&w=majority").then(()=>{
    console.log("connection sucess");
}).catch((e)=>{
console.log(e.message)
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
// app.use(env.config())
app.use("/uploads",express.static("uploads"))
var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
    }
});
//   const maxSize=50*1024;
var upload = multer({ storage: storage });
// parse application/json
app.use(bodyParser.json())
const PostModel=require("./Models/post")
app.get("/api/v1/post",cors(),async ( req , res)=>{
    try{
     const data= await PostModel.find();
     res.json({
        status:"sucess",
        data
     })
    }
    catch(e){
        res.json({
            status:"Failed",
            message:e.message
        })
    }
})

app.post("/api/v1/createpost",upload.single('postImage'),cors(), async (req,res)=>{
try{
    // upload(req,res,function (err){
    //     if(err instanceof multer.MulterError){
    //       return res.send(err)
    //     }else if(err){
    //         return res.send(err)
    //     }
    // })
console.log(req.body,req.file)
 const data= await PostModel.create({
    name:req.body.name,
    location:req.body.location,
    description:req.body.description,
    postImage:{
        data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
        contentType: "image/png"
    }
  } )

  res.json({
    status:"sucess",
    data:data
  })
}
catch(e){
    res.json({
        status:"Failed",
        message:e.message
    })
}

})
app.listen(process.env.PORT || 8080,()=>{
    console.log("connection to port 8080")
})