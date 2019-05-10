const express=require('express');
const router=express.Router();
const figureController = require('../controllers/figure');

//--------------------霹雳人物操作----------------
router.get('/', figureController.getFigure) //获取人物管理的页面
router.get('/data', figureController.getFiugreData);//获得人物具体资料
router.get('/ueditor', figureController.getUeditor) //获取人物管理的页面
router.post('/add', figureController.addFigure) //处理上传的人物资料信息
router.get('/delete', figureController.deleteFigure);//删除人物
router.get('/updata', figureController.updataFigure);//更新人物

module.exports=router;
