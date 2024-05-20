const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv')
dotenv.config({path:'./routes/.env'});

const auth   = async (req,res,next) => {
    
    const auth_header=req.headers["authorization"];
    if (!auth_header) {
        return res.status(401).json({message:"unautherized "});

    }
     const token=auth_header.replace(/bearer/i,'').trim();
     
     if (!token) {
        
        return res.status(401).json({message:"unautherized"})        

     }
    try {
         if(process.env.JWT_SECRET){
         const decode=jsonwebtoken.verify(token,process.env.JWT_SECRET);
          
          const user =  await User.findById({_id:decode._id},{password:0})
          if (!user) {
            return res.status(401).json({message:"unauterized "});

          }
          req.user=user;
          next();
        }
          
        
    } catch (error) {
       
        
        return res.status(401).json({message : "unautherized "});
        
    }
   
}
module.exports=auth;