// 应用的启动点
const express=require('express');
const app=express();
const router=require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose=require('mongoose');
const swig=require('swig');


// var async=require('async');
// 开发过程取消缓存机制 无需重启服务器 便能访问更改后的页面
swig.setDefaults({cache:false});

 // 配置bodyparser 用来解析post内容 会在api.js中的req添加body属性
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// var sqlite3 = require('sqlite3').verbose();

var Cookies =require('cookies');

// 设置静态文件托管
// 当用户访问的url以publuc 开始 直接返回对应的__dirname +'public'下的文件
app.use('/public',express.static(__dirname+'/public'));

// 配置应用模块
// 定义当前应用所用的模块引擎
// 参数：模板引擎的名称也是模板文件的后缀名； 表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile);
// 设置模板文件的存放目录 第一个参数不能变 第二参数是目录
app.set('views','./views');
// 注册所用的模板引擎，第一个参数不变，第二个参数和app.engine 的第一个参数一致
app.set('view engine','html');


// 错误信息处理机制 config.isDebug)
if (true) {
  app.use(function (err, req, res, next) {
      // res.send('500, Interal Server Error'+ err);
      console.log(err)
  })
} else {
  app.use(function (err, req, res, next) {
      // res.send('500, Interal Server Error'+ err);
      logger.info(err);
  })
}



// 挂载session中间件
app.use(session({
  secret:" config.secretKey",  // 每一次在生成Cookie的时候，通过一个私钥生成一个字符串然后再交给客户端(读取我的配置文件里面的私钥key)
  resave: false,
  saveUninitialized: true,
  // cookie : {secure : true }
}));



// 加载路由中间件（最后进入到路由）
app.use(router);

mongoose.connect('mongodb://localhost:27017/pili',function(error){
  if(error){
    console.log('数据库连接失败');
    return;
  }else{
    app.listen(8080,'127.0.0.1',function(){
      console.log('服务器启动了。。。。');
    
    })
  }
})

