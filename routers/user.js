const express=require('express');
const router=express.Router();
const userController = require('../controllers/user');



//-------------------用户登陆注册操作----------------------------
router.get('/register', [checkLogin, userController.getRegister]); //返回用户注册界面
router.post('/register', userController.register); //对用户注册的账号进行检测保存
router.get('/login', [checkLogin, userController.getLogin]);//返回用户登陆界面
router.post('/login', userController.login);//处理用户提交的登陆信息
router.get('/logout', userController.logout);// 退出登陆

function checkLogin(req, res, next) {
    if (req.session.user) { //用户登陆的情况下 让用户回到首页,不能访问注册界面
        return res.render('index', {
            user: req.session.user,
        });
    } else {
        next();
    }
}

module.exports=router;