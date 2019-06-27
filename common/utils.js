const svgCaptcha = require('svg-captcha');
const formidable = require('formidable');
const fs = require('fs');

function setResultData(success, msg, data) {
    return {
        success: success,//该操作是否成功
        msg: msg, //信息
        data: data || null, // 数据
    };
}

//返回一个验证码
exports.getCaptcha = function (req, res, next) {
    let captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;
    res.type('svg'); //响应类型
    res.status(200).send(captcha.data);
}

// 返回给前端的统一数据格式
exports.setResultData = setResultData;

//接收单个图片文件
exports.uploadImg = function (req, res, config, callback) {
    var form = formidable.IncomingForm({
        encoding: 'utf-8',//上传编码
        uploadDir: config.uploadDir || 'public/images',//上传目录，指的是服务器的路径，如果不存在将会报错。
        keepExtensions: config.keepExtensions || true, //保留后缀
        maxFieldsSize: config.maxFieldsSize || 5 * 1024 * 1024//byte//最大可上传大小
    });
    form.parse(req, function (err, fromData, files) {
        if (!files.imgFile) return callback(fromData, files, false, '上图片文件不能为空');
        if (err) {
            return callback(fromData, files, false, '上传图片操作失败');
        }
        var typeName = '';
        switch (files.imgFile.type) {
            case 'image/pjpeg':
                typeName = 'jpg';
                break;
            case 'image/jpeg':
                typeName = 'jpg';
                break;
            case 'image/png':
                typeName = 'png';
                break;
            case 'image/x-png':
                typeName = 'png';
                break;
        }
        if (typeName === '') {//如果上传的图片不符合格式 ，则返回失败 并且删除掉该文件
            fs.unlink(files.imgFile.path, function (err) {
                if (err) console.log("删除失败");
            });
            return callback(fromData, files, false, '请上传png,jpg格式的图片');
        }
        return callback(fromData, files, true, '上传图片成功');
    });
}
