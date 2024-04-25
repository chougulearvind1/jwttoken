const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    loaction:String,
    dateOfBirth:String
},{timestamps:true});

module.export=mongoose.model('user',userSchema);