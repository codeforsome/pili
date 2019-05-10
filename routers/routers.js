const user=require('./user');
const data=require('./data');
const admin=require('./admin');
const figure=require('./figure');

exports.use=function(app){
    app.use('/user',user); //处理用户的请求
    app.use('/data',data)  //返回前端所需要的各种数据
    app.use('/admin',admin);// 管理员
    app.use('/figure',figure);// 霹雳人物
};