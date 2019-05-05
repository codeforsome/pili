const mongoose=require('mongoose');


// 霹雳人物表 
module.exports=new mongoose.Schema({
    figureName:String,//人物名
    addTime: Date,// 创建时间
    views:Number,//阅读量
    likes:Number,//点赞量
    comments:Number,//评论量
    content:String,//主体内容
    imgUrl:String,//人物图片
})