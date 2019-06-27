const express = require('express');
const router = express.Router();
const utils = require('./common/utils');







// 404 页面
router.use(function (req, res, next) {
    return res.render('404');
});


module.exports = router;

