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
    },
    music:{
        title: '霹雳音乐',
        bgUrl: '/public/images/music_bg.jpg',
        bgFontUrl: '/public/images/music_bg_font.png',
    },
    activity:{
        title: '霹雳活动',
        bgUrl: '/public/images/activity_bg.jpg',
        bgFontUrl: '/public/images/activity_bg_font.png',
    },
    episode:{
        title: '霹雳剧集',
        bgUrl: '/public/images/episode_bg.jpg',
        bgFontUrl: '/public/images/episode_bg_font.png',
    },
    press:{
        title: '霹雳新闻',
        bgUrl: '/public/images/press_bg.jpg',
        bgFontUrl: '/public/images/press_bg_font.png',
    },
}
exports.getAllData = function (req, res, next) {
    IndexSlideshow.find().then(function (schemas) {
      return  res.json(utils.setResultData(true,'',schemas));
    });
}

exports.getPress=function(req,res,next){
    res.render('press',{
        data:data.press
    });
}

exports.getEpisode=function(req,res,next){
    res.render('episode',{
        data:data.episode,
    })
}

exports.getActivity=function(req,res,next){
    res.render('activity',{
        data:data.activity,
    })
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

exports.getMusic=function(req,res,next){
    res.render('music',{
        data:data.music,
    });
}