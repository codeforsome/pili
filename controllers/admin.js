const fs = require('fs');
const IndexSlideshow = require('../models/IndexSildeshow');
const utils = require('../common/utils');
const uuid = require('node-uuid');
const mongoose = require('mongoose');

var imgConfig = {
    uploadDir: 'public/files/slide-img',//上传目录，指的是服务器的路径，如果不存在将会报错。
    keepExtensions: true, //保留后缀
    maxFieldsSize: 5 * 1024 * 1024//byte//最大可上传大小
}


exports.getAdmin = function (req, res, next) {
    res.render('admin/dist/component/layout_top.html', {
        title: '管理员首页',
    })
}

exports.getAllData = function (req, res, next) {
    IndexSlideshow.find().then(function (schemas) {
      return  res.json(utils.setResultData(true,'',schemas));
    });
}

exports.getSilideshow = function (req, res, next) {
    res.render('admin/dist/change_slideshow.html', {
        title: '轮播图操作',
    })
}



exports.updataSlideshow = function (req, res, next) {
    utils.uploadImg(req, res, imgConfig, function (fromData, files,success,msg) {
        if(!success && files.imgFile){
            return res.json(utils.setResultData(false,msg,null));
        }
        var targetId = fromData.imgId || '';// 用户要求修改的图片id
        IndexSlideshow.findById(targetId).then(function (item) {
            // 当数据库存在该图片
            if (item) {
                //当用户修改信息有上传图片时
                if (files.imgFile) {
                    fs.exists('.' + item.url, function (exists) {
                        if (exists) {
                            fs.unlink('.' + item.url, function (err) {
                                if (err) console.log("删除失败");
                            });
                        } else {
                            console.log("文件不存在")
                        }
                    })
                };
                var url = files.imgFile ? '/' + files.imgFile.path.replace(/\\/g, "/") : item.url;
                IndexSlideshow.update({
                    _id: targetId,
                }, {
                        url: url,
                        leftContent: fromData.leftContent,
                        rightContent: fromData.rightContent,
                    }, function (err) {
                        if (err) console.log('修改失败')
                    });
            } else {
                return res.json(utils.setResultData(false, "你要修改的目标图片不存在", null));
            }
        });
        return res.json(utils.setResultData(true, "修改成功", null));
    });
}

exports.addSlideshow = function (req, res, next) {
    // 上传图片 
    utils.uploadImg(req, res, imgConfig, function (fromData, files,success,msg) {
        if(!success && files.imgFile){
            return res.json(utils.setResultData(false,msg,null));
        }
        // 保存用户发送的信息
        var indexSlideshow = new IndexSlideshow({
            url: '/' + files.imgFile.path.replace(/\\/g, "/"),
            leftContent: fromData.leftContent,
            rightContent: fromData.rightContent,
        });
        indexSlideshow.save();
        return res.json(utils.setResultData(true, "添加成功", null));
    });

}

exports.deleteSildeshow = function (req, res, next) {
    var id = mongoose.Types.ObjectId((req.query.id || ' '));
    IndexSlideshow.findById(id).then(function (item) {
        if (item) {
            fs.exists('.' + item.url, function (exists) {
                if (exists) {
                    fs.unlink('.' + item.url, function (err) {
                        if (err) {
                            console.log("删除失败");
                        } else { }
                    });
                } else {
                    console.log("文件不存在")
                }
            })
            IndexSlideshow.remove({
                _id: id
            }, function (err, res) {
                if (err) {
                    console.log('删除失败');
                    res.send(utils.setResultData(false, "删除失败", null));
                }
            })
            res.send(utils.setResultData(true, "删除成功", null));
        }
    });
}

