const formidable = require('formidable');
const fs = require('fs');
const IndexSlideshow = require('../../models/IndexSildeshow');
const utils = require('../../common/utils');
const uuid = require('node-uuid');
var imgFile = {
    types: ['jpg', 'png', 'jpeg'],
    savePath: 'public/files/slide-img',
}

exports.getAdmin = function (req, res, next) {
    res.render('admin/dist/component/layout_top.html',{
        title:'管理员首页',
    })
}

exports.getSilideshow = function (req, res, next) {
    res.render('admin/dist/change_slideshow.html',{
            title:'轮播图操作',
    })
}

//检查上传的文件是否为图片
function checkIsImgFile(file, callback) {
    if (file) {
        var image = new Image();
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            image.src = reader.result;
            //图片读取事件
            image.onload = function () {
                if (image.naturalHeight && image.naturalWidth) {
                    callback(true);
                } else {
                    callback(false);
                }
            }
            //图片加载失败
            image.onerror = function () {
                callback(false);
            }
        };
    } else {
        callback(false);
    }
}

//上传图片文件
function uploadImg(req, res, callback) {
    var form = formidable.IncomingForm({
        encoding: 'utf-8',//上传编码
        uploadDir: imgFile.savePath,//上传目录，指的是服务器的路径，如果不存在将会报错。
        keepExtensions: true,//保留后缀
        maxFieldsSize: 5 * 1024 * 1024//byte//最大可上传大小
    });
    form.parse(req, function (err, fromData, files) {
        if (err) {
            res.send(utils.setResultData(false, "操作失败" + err, null));
        }
        callback(fromData, files);
        form.on('file', function (filed, file) {
        }).on('end', function () {
            res.end('上传成功！');
        }).on('error', function (err) {
            console.error('上传失败：', err.message);
            next(err);
        });
    });
}
exports.updataSlideshow = function (req, res, next) {
    uploadImg(req, res, function (fromData, files) {
        var targetId = fromData.imgId || '';// 用户要求修改的图片id
        IndexSlideshow.findById(targetId).then(function (item) {
            // 当数据库存在该图片
            if (item) {
                //当用户修改信息有上传图片时
                if (files.imgFile) {
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
                }
                var url = files.imgFile ? '/' + files.imgFile.path.replace(/\\/g, "/") : item.url;
                IndexSlideshow.update({
                    _id: targetId,
                }, {
                        url: url,
                        leftContent: fromData.leftContent,
                        rightContent: fromData.rightContent,
                    }, function (err) {
                        if (err)
                            console.log('修改失败')
                    });

            } else {
                res.send(utils.setResultData(false, "你要修改的目标图片不存在", null));
                return;
            }
        });
        res.send(utils.setResultData(true, "修改成功", null));

    });
}

exports.addSlideshow = function (req, res, next) {
    // 上传图片 
    uploadImg(req, res, function (fromData, files) {
        // 保存用户发送的信息
        var indexSlideshow = new IndexSlideshow({
            url: '/' + files.imgFile.path.replace(/\\/g, "/"),
            leftContent: fromData.leftContent,
            rightContent: fromData.rightContent,
        });
        indexSlideshow.save();
        res.send(utils.setResultData(true, "添加成功", null));

    });

}

exports.deleteSildeshow=function(req,res,next){
    var id=req.query.id || '';
    IndexSlideshow.findById(id).then(function(item){
        if(item){
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
                _id:id
            },function(err,res){
                if(err) {
                    console.log('删除失败');
                    res.send(utils.setResultData(false, "删除失败", null));
                }
            })
            res.send(utils.setResultData(true, "删除成功", null));
        }
    });
}