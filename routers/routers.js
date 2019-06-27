const user=require('./user');
const view=require('./view');
const admin=require('./admin');
const figure=require('./figure');
const music=require('./music');
const index=require('./index');
const utils=require('../common/utils');

exports.use=function(app){
    app.use('/',index);
    app.use('/user',user); //处理用户的请求
    app.use('/view',view)  //返回前端所需要的各个页面
    app.use('/admin',admin);// 管理员
    app.use('/figure',figure);// 霹雳人物
    app.use('/captcha',utils.getCaptcha) //验证码

};