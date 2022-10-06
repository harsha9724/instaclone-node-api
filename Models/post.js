const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
    name:String,
    location:String,
    description:String,
    likes:{type:Number,default:60},
    date:{type:Date,default:Date.now()},
    postImage:{
        data:Buffer,
       contentType:String
    }
})

const PostModel=new mongoose.model("posts",postSchema);
module.exports=PostModel;