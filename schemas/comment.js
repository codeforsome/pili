const mongoose=require('mongoose');

module.exports=new mongoose.Schema({
    figureId:{
        type:mongoose.Schema.Types.ObjectId,
        // 引用 ref 对应的应该是在modules中注册过的model
       ref:'Figure'
    },
    
})