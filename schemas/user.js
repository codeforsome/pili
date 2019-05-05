const mongoose=require('mongoose');
const config=require('../config');

module.exports=new mongoose.Schema({
    username:String,
    password:String,
    //注册时间
    addTime:{
        type:Date,
        default:new Date()
    },
    nikename:String, //用户昵称
    sex:String,//性别
    brithday:Date, //出生日期
    face:{ //用户头像 
        type:String,
        default:config.face,
    },
    signature:String,//个人签名
});
