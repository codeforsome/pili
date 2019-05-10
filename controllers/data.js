const IndexSlideshow = require('../models/IndexSildeshow');
const utils = require('../common/utils');

const data = { //传给页面的数据 
    wallpaper: {
        title: '霹雳图库',
        bgUrl: '/public/images/wallpapaer_bg.jpg',
        bgFontUrl: '/public/images/wallpaper_bg_font.png',
    },
    figure: {
        title: '霹雳人物',
        bgUrl: '/public/images/figure_bg.jpg',
        bgFontUrl: '/public/images/figure_bg_font.png',
    },
    shoop: {
        title: '霹雳商品馆',
        bgUrl: '/public/images/shoop_bg.jpg',
        bgFontUrl: '/public/images/shoop_font.png',
    }
}
exports.getAllData = function (req, res, next) {
    IndexSlideshow.find().then(function (schemas) {
      return  res.json(utils.setResultData(true,'',schemas));
    });
}


exports.getWallpaper = function (req, res, next) {
    res.render('wallpaper.html', {
        data: data.wallpaper,
    });
}

exports.getFigure = function (req, res, next) {
    res.render('figure.html', {
        data: data.figure,
    });
}

exports.getFigureNoe = function (req, res, next) {
    var title = req.query.title
    res.render('figure_noe.html', {
        data: {
            title: title,
        }
    })
}

exports.getShoop = function (req, res, next) {
    res.render('shoop.html', {
        data: data.shoop,
    })
}