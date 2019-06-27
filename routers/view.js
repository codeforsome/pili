const express=require('express');
const router=express.Router();
const dataController=require('../controllers/data');

router.get('/wallpaper', dataController.getWallpaper);// 获得图片壁纸展示的页面
router.get('/figure', dataController.getFigure);//获取人物资料和图片页面
router.get('/figure/noe', dataController.getFigureNoe);//获取某个人物资料和图片页面
router.get('/shoop', dataController.getShoop);//获取商品页面
router.get('/slideshow', dataController.getAllData)//获取轮播图数据
router.get('/music', dataController.getMusic)//获取霹雳音乐页面
router.get('/activity', dataController.getActivity)//获取霹雳活动页面
router.get('/episode', dataController.getEpisode)//获取霹雳剧集页面
router.get('/press', dataController.getPress)//获取霹雳新闻页面
// router.get('/captcha', utils.getCaptcha); //获取验证码


module.exports=router;