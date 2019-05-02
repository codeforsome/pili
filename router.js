const express=require('express');
const router=express.Router();
const utils=require('./common/utils');
const userController=require('./controllers/user');
const indexController=require('./controllers/index');
const adminController=require('./controllers/admin/admin');
const dataController=require('./controllers/data');


router.get('/',indexController.showIndex);

router.get('/captcha',utils.getCaptcha); //获取验证码

router.get('/register',userController.getRegister); //返回用户注册界面
router.post('/register',userController.register); //对用户注册的账号进行检测保存
router.get('/data/slideshow',dataController.getSlideshow)//获取轮播图数据

router.get('/admin/',adminController.getAdmin);//获取管理员页面
router.get('/admin/sildeshow',adminController.getSilideshow);//获取轮播图操作页面
router.post('/admin/updata/slideshow',adminController.updataSlideshow);//修改轮播图
router.post('/admin/add/slideshow',adminController.addSlideshow);//新增轮播图
module.exports = router;