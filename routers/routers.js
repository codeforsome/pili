const user=require('./user');
const data=require('./data');
const admin=require('./admin');
const figure=require('./figure');
const music=require('./music');
const index=require('./index');

exports.use=function(app){
    app.use('/',index);
    app.use('/user',user); //处理用户的请求
    app.use('/data',data)  //返回前端所需要的各个页面
    app.use('/admin',admin);// 管理员
    app.use('/figure',figure);// 霹雳人物
    // app.use('/music',music);//霹雳音乐
    // 404 页面
//     app.use(function (req, res, next) {
//          return res.render('404');
//    });
};