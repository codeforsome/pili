//检查上传的文件是否为图片
function checkIsImgFile(file, callback) {
    if (file) {
        if (window.FileReader) {
            var image = new Image();
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                image.src = reader.result;
                //图片读取事件
                image.onload = function () {
                    if (image.naturalHeight && image.naturalWidth) {
                        isSuccess=true;
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
        }
    } else {
        callback(false);
    }
}
//检查上传的图片规格 图片文件大小是否符合要求
function checkImgSpecifi(file,maxSize,type){
    if( !file || !maxSize || !type){
        return {
            isPass:false,
            msg:'传入的参数不能有空值'
        }
    }
    if (file.size > maxSize) {
        return {
            isPass:false,
            msg:'图片文件大小不能大于'+maxSize/1024/1024+'M'
        }
    }
    var imgType = file.type.split('/')[1].toLowerCase();
    for(var index in type){
        if(imgType==type[index])break;
        if(index==type.length-1){
            return {
                isPass:false,
                msg:'上传的图片类型只能为'+type
            }
        }
    }
    return {
        isPass:true,
        msg:''
    }

}