const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    gender:{
        type:String
    },
    DOB:{
        type:String
    },
    phone:{
        type:Number
    },
    
},{timestamps:true}) ;
module.exports=mongoose.model('DUMP',userSchema)