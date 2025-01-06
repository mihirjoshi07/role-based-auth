const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true,enum:["admin","manager","user"]},
})

const userModel=mongoose.model("User",userSchema);
module.exports=userModel;