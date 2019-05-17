const formidable = require('formidable');
const fs = require('fs');
const Figure = require('../models/Figure');
const utils = require('../common/utils');
const moment = require('moment');
const mongoose = require('mongoose');

moment.locale('zh-cn');
var imgConfig = {
    uploadDir: 'public/images/figure',//上传目录，指的是服务器的路径，如果不存在将会报错。
    keepExtensions: true, //保留后缀
    maxFieldsSize: 5 * 1024 * 1024//byte//最大可上传大小
}
exports.getUeditor = function (req, res, next) {
    var updata;
    if(req.query.updata==='true'){
        updata=true;
    }else{
        updata=false;
    }
    res.render('admin/dist/ueditor.html', {
        title: '文本编辑',
        updata:updata,
    })
}

exports.getFigure = function (req, res, next) {
    res.render('admin/dist/change_figure.html', {
        title: '人物资料管理'
    })
}
exports.getFigureDataById = function (req, res, next) {
    var id= mongoose.Types.ObjectId( (req.params.id || '') );
    Figure.findById(id).then(function(item){
        if(item){
           return res.json(utils.setResultData(true,'查找成功',item));
        }else{
            return  res.json(utils.setResultData(false,'没有该人物'));
        }
    });
}
//从数据库中分页获取数据
exports.getFiugreData = function (req, res, next) {
    var page = Number(req.query.page || 1), 
    limit = Number(req.query.limit || 5), 
    pages;
    Figure.count().then(function (count) {
        // count为数据的总条数 向上取整
        pages = Math.ceil(count / limit);
        // 取值不能超过pages
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page - 1) * limit;
        Figure.find().limit(limit).skip(skip).then(function (figures) {
            return res.json(utils.setResultData(true, '获取成功', figures));
        });

    });
}


exports.addFigure = function (req, res, next) {
    // 上传图片 
    utils.uploadImg(req, res, imgConfig, function (fromData, files,success,msg) {
        if(!success && files.imgFile){
            return res.json(utils.setResultData(false,msg,null));
        }
        // 保存用户发送的信息
        var figure = new Figure({
            figureName: fromData.figureName,//人物名
            addTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            views: 0,//阅读量
            likes: 0,//点赞量
            comments: 0,//评论量
            content: fromData.content,//主体内容
            imgUrl: '/' + files.imgFile.path.replace(/\\/g, "/"),
        });
        figure.save(function (err) {
            if (err) {
                console.log(err);
                return res.json(utils.setResultData(false, "保存失败", null));
            }
        })
        return res.json(utils.setResultData(true, "添加成功", null));
    });

}

exports.deleteFigure = function (req, res, next) {
    var id = mongoose.Types.ObjectId((req.query.id || ''));
    Figure.findById(id).then(function (item) {
        if (item) {
            fs.unlink('.'+item.imgUrl, function (err) {
                if (err) console.log("文件删除失败"+'.'+item.url);
            });
            Figure.findByIdAndRemove(id, function (err) {
                if (err)
                    return res.json(utils.setResultData(false, '删除失败'));
                else{
                   
                    return res.json(utils.setResultData(true, '删除成功'));
                }

            })
        }
    })
}


exports.updataFigure = function (req, res, next) {
     // 上传图片 
     utils.uploadImg(req, res, imgConfig, function (fromData, files,success,msg) {
        if(!success && files.imgFile){
            return res.json(utils.setResultData(false,msg,null));
        }
        var id=fromData.id;
        
        Figure.findByIdAndUpdate(
            {_id:id},
            { figureName: fromData.figureName,//人物名
                content: fromData.content,//主体内容
                imgUrl:files.imgFile ?  '/' + files.imgFile.path.replace(/\\/g, "/") : fromData.oldImgUrl,
            },function(err){
                if(err) return res.json(utils.setResultData(false,'修改出现错误'+err));
            }
        );
        return res.json(utils.setResultData(true, "添加成功", null));
    });

}