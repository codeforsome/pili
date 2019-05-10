const express = require('express');
const router = express.Router();
const utils = require('./common/utils');
const indexController = require('./controllers/index');


// 前端路由
// -----------------------------------------------------------------------------------------
router.get('/', indexController.showIndex); 
router.get('/captcha', utils.getCaptcha); //获取验证码




// 404 页面
router.use(function (req, res, next) {
    return res.render('404');
});

function checkLogin(req, res, next) {
    if (req.session.user) { //用户登陆的情况下 让用户回到首页,不能访问注册界面
        return res.render('index', {
            user: req.session.user,
        });
    } else {
        next();
    }
}

module.exports = router;

