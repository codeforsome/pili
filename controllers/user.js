const User=require('../models/User');
const utils=require('../common/utils');
const utility = require('utility');   // 需要的MD5加密工具包



exports.register=function(req,res,next){
    var username=req.body.username;
    var password=req.body.password;
    var captcha=req.body.captcha;
    if( !(username&&password&&captcha&&req.session.captcha) ){
        return res.json(utils.setResultData(false,'密码，账号,验证码不能为null或者undefined,空字符串',null)); 
    }else if(captcha.toLowerCase()!=req.session.captcha.toLowerCase()){
        return  res.json(utils.setResultData(false,'验证码错误',null));  
    }
    // 查找用户名是否已经注册
    User.findOne({
        username:username,
    }).then(function(item){
        if(item){
            return  res.json(utils.setResultData(false,'该用户名已经注册了！',null));  
        }else{
            password=utility.md5(password+req.app.config.secretKey);
            var user=new User({
                username:username,
                password:password,
                nikename:"", //用户昵称
                sex:"",//性别
                signature:"",//个人签名
            })
            user.save(function(err,res){
                if(err){
                    console.log(err);
                     return res.json(utils.setResultData(false,'注册保存失败',null));  
                }
            });
            req.session.user=item;
            return res.json(utils.setResultData(true,'注册成功',null));  
        }
    });
   
}

exports.getRegister=function(req,res,next){
    res.render('register.html');
}

exports.getLogin=function(req,res,next){
    res.render('login.html')
}

exports.login=function(req,res,next){
    var username=req.body.username;
    var password=req.body.password;
    var captcha=req.body.captcha;
    if( !(username&&password&&captcha&&req.session.captcha) ){
        return res.json(utils.setResultData(false,'密码，账号,验证码不能为null或者undefined,空字符串',null)); 
    }else if(captcha.toLowerCase()!=req.session.captcha.toLowerCase()){
        return  res.json(utils.setResultData(false,'验证码错误',null));  
    }
    User.findOne({
        username:username,
        password:utility.md5(password+req.app.config.secretKey),
    }).then(function(item){
        if(item){
            req.session.user=item;
            return  res.json(utils.setResultData(true,'登陆成功',null));   
        }else{
            return  res.json(utils.setResultData(false,'账号或者密码错误',null));  
        }
    })
   
}

exports.logout=function(req,res,next){
    req.session.user='';//清除session的用户信息
    res.render('index');
}