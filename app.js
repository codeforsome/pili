// 应用的启动点
const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const swig = require('swig');
const path = require('path');
const config = require('./config');
const routers = require('./routers/routers');
const  MongoStore = require('connect-mongo')(session);
// const ueditor_backend = require('ueditor-backend');

//加载ueditor 模块
const ueditor = require("ueditor");

app.config = config;//挂载配置文件中的数据信息

// 开发过程取消缓存机制 无需重启服务器 便能访问更改后的页面
swig.setDefaults({ cache: false });

// 配置bodyparser 用来解析post内容 会在api.js中的req添加body属性
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var Cookies = require('cookies');

// 设置静态文件托管
// 当用户访问的url以publuc 开始 直接返回对应的__dirname +'public'下的文件
app.use('/public', express.static(__dirname + '/public'));
app.use('/ueditor', express.static(__dirname + '/ueditor'));

// 定义当前应用所用的模块引擎
// 参数：模板引擎的名称也是模板文件的后缀名； 表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
// 设置模板文件的存放目录 第一个参数不能变 第二参数是目录
app.set('views', './views');
// 注册所用的模板引擎，第一个参数不变，第二个参数和app.engine 的第一个参数一致
app.set('view engine', 'html');


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

//使用模块
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'ueditor'), function (req, res, next) {
  // ueditor 客户发起上传图片请求
  if (req.query.action === 'uploadimage') {
    var foo = req.ueditor;
    var imgname = req.ueditor.filename;
    var img_url = '../public/images/figure/';//ueditor下的目录 输入要保存的地址 。保存操作交给ueditor来做
    /*其他上传格式的地址*/
    //   if (ActionType === 'uploadfile') {
    //     file_url = '/file/ueditor/'; //附件
    // }
    // if (ActionType === 'uploadvideo') {
    //     file_url = '/video/ueditor/'; //视频
    // }
    res.ue_up(img_url);
    res.setHeader('Content-Type', 'text/html');//IE8下载需要设置返回头尾text/html 不然json返回文件会被直接下载打开
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage') {
    var dir_url = '/ueditor/images/ueditor/';
    res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/jsp/config.json');
  }
}));


// 挂载session中间件
app.use(session({
  name:'pili',
  secret: config.secretKey,  // 每一次在生成Cookie的时候，通过一个私钥生成一个字符串然后再交给客户端(读取我的配置文件里面的私钥key)
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge:1000*60*60*10 },//cookie保存时间
  store: new MongoStore({   //创建新的mongodb数据库  保存用户登陆状态
    url: 'mongodb://localhost/pili',
    host: 'localhost',    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
    port: 27017,          //数据库的端口号
    db: 'pili'        //数据库的名称。
  }),
}));

routers.use(app);

// 加载路由中间件（最后进入到路由）
app.use(router);

mongoose.connect('mongodb://localhost:27017/pili', function (error) {
  if (error) {
    console.log('数据库连接失败');
    return;
  } else {
    app.listen(config.port, config.host, function () {
      console.log('服务器启动了。。。。');

    });
  }
});
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});

