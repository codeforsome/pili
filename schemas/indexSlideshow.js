const mongoose=require('mongoose');

module.exports=new mongoose.Schema({
    url:String,
    leftContent:String,
    rightContent:String,
});
