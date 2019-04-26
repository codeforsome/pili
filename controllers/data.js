const IndexSlideshow=require('../models/IndexSildeshow');

exports.getSlideshow=function(req,res,next){
        IndexSlideshow.find().then(function(schemas){
            res.send(schemas);
        });
}