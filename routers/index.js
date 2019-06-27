const express=require('express');
const router=express.Router();


router.get('/',function(req,res,next){
    return res.render('index',{
        user:req.session.user,
    });
})
module.exports=router;