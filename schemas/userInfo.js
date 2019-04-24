const mongoose=require('mongoose');

module.exports=new mongoose.Schema({
      // 关联用户
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //注册时间
    addTime:{
        type:Date,
        default:new Date()
    },
    nikename:String, //用户昵称
    sex:String,//性别
    brithday:Date, //出生日期

})