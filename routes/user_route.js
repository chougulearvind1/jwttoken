const express = require('express');
const protectedroute = require('../middleware/protectedroute');
const router=express.Router();
router.get('/profile',protectedroute,(req,res) => {
    res.send(req.user)
})
module.exports=router;
