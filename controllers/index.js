const IndexSlideshow = require('../models/IndexSildeshow');


exports.showIndex=function(req,res,next){
    res.render('index.html');
}