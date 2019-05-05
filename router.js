const express=require('express');
const router=express.Router();
const utils=require('./common/utils');
const userController=require('./controllers/user');
const indexController=require('./controllers/index');
const adminController=require('./controllers/admin/admin');
const figureController=require('./controllers/admin/figure');
const dataController=require('./controllers/data');
const databankController=require('./controllers/databank');


// 前端路由
// -----------------------------------------------------------------------------------------
router.get('/',indexController.showIndex);
router.get('/wallpaper',databankController.getWallpaper);// 获得图片壁纸展示的页面
router.get('/figure',databankController.getFigure);//获取人物资料和图片页面
router.get('/figure/noe',databankController.getFigureNoe);//获取某个人物资料和图片页面
router.get('/shoop',databankController.getShoop);//获取商品页面
router.get('/captcha',utils.getCaptcha); //获取验证码

//-------------------用户登陆注册操作----------------------------
router.get('/register',[checkLogin,userController.getRegister]); //返回用户注册界面
router.post('/register',userController.register); //对用户注册的账号进行检测保存
router.get('/login',[checkLogin,userController.getLogin]);//返回用户登陆界面
router.post('/login',userController.login);//处理用户提交的登陆信息
router.get('/logout',userController.logout);// 退出登陆




// 后端路由
// -----------------------------------------------------------------------------------------
router.get('/admin/',adminController.getAdmin);//获取管理员页面
//--------------------轮播图操作----------------
router.get('/admin/sildeshow',adminController.getSilideshow);//获取轮播图操作页面
router.get('/data/slideshow',adminController.getAllData)//获取轮播图数据
router.post('/admin/updata/slideshow',adminController.updataSlideshow);//修改轮播图
router.post('/admin/add/slideshow',adminController.addSlideshow);//新增轮播图
router.get('/admin/delete/slideshow',adminController.deleteSildeshow) //删除轮播图

//--------------------霹雳人物操作----------------
router.get('/admin/figure',figureController.getFigure) //获取人物管理的页面
router.get('/admin/data/figure',figureController.getFiugreData);//获得人物具体资料
router.get('/admin/ueditor',figureController.getUeditor) //获取人物管理的页面
router.post('/admin/add/figure',figureController.addFigure) //处理上传的人物资料信息


// 404 page
router.use(function (req, res, next) {
    return res.render('404');
});

function checkLogin(req,res,next){
    if(req.session.user){ //用户登陆的情况下 让用户回到首页,不能访问注册界面
        return res.render('index',{
            user:req.session.user,
        });
    }else{
        next();
    }
}

module.exports = router;

