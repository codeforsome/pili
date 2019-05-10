const adminController = require('../controllers/admin');
const express=require('express');
const router=express.Router();

// 后端路由
// -----------------------------------------------------------------------------------------
router.get('/', adminController.getAdmin);//获取管理员页面
//--------------------轮播图操作----------------
router.get('/sildeshow', adminController.getSilideshow);//获取轮播图操作页面
router.post('/updata/slideshow', adminController.updataSlideshow);//修改轮播图
router.post('/add/slideshow', adminController.addSlideshow);//新增轮播图
router.get('/delete/slideshow', adminController.deleteSildeshow) //删除轮播图

module.exports=router;

