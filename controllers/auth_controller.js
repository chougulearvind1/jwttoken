const User = require('../models/user');
const bcrypt = require('bcrypt');
const jsonwebtokens = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const register= async (req,res)  => {
    try {
        console.log(req.body,'req body');
        const {name,username,email,password}=req.body;
        if (!name||!username||!email||!password) {
          return res.status(400).json({
            message:"all feild are mandatory"
          })
        }
        let user=await User.findOne({email})
        if (user) {
            return res.status(400).json({
                message:"user with provided email is already registered"
              })
        }
         user=await User.findOne({username})
        if (user) {
            return res.status(400).json({
                message:"user with provided username is already registered"
              })
        }
        const hasPassword=await bcrypt.hash(password,10);
        const userr = new User({name,username,email,password:hasPassword} );
        const resp=await userr.save();
        res.status(201).json({message:'user registered sucessfully'},resp)

    } catch (error) {
        res.status(400).json({message:'an error occured while registration'});
        console.log(error);
    }
}
const login=async (req,res) => { 
  try {
    console.log("you entered into login function adn req  body is ",req.body);
     const {email,password}=req.body;
     if (!email||!password) {
      return res.status(400).json({message:"email and password required "});
     }
      let user=await User.findOne({email});
      if (!user) {
        return  res.status(400).json({message:"Email not registerd with us yet"})
      }
      const match =await bcrypt.compare(password,user.password);
      const payload={
        _id:user._id,
        name:user.name,
        email:user.email
      }
      if (match) {
        if(process.env.JWT_SECRET){
      
       const token=await jsonwebtokens.sign(payload,process.env.JWT_SECRET)       
       
         return res.status(200).json({message:"Logged in sucessfully.",token})
        }
       
      } else {
        return res.status(400).json({message:"Email and password incorrect "})

      }
  } catch (error) {
    console.log(error);
  }
 }

module.exports={register,login};