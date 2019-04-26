const User=require('../models/User');
const utils=require('../common/utils');

exports.register=function(req,res,next){
    var username=req.body.username;
    var password=req.body.password;
    var captcha=req.body.captcha;
    console.log(username)
    console.log(req.body)
    if(utils.isNullOrUndefined(username,password,captcha)){
        res.send(utils.setResultData(false,'密码，账号,验证码不能为null或者undefined',null));  
    }else if(username==''||password==''||captcha==''){
        res.send(utils.setResultData(false,'密码，账号,验证码不能为空值字符串',null));  
    }else if(captcha!=req.session.captcha){
        res.send(utils.setResultData(false,'验证码错误',null));  
    }
    next();
   
}

exports.getRegister=function(req,res,next){
    res.render('register.html');
}
