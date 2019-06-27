//轮播图
var slideshow = new Vue({
    delimiters: ['${', '}'],
    el: '#slideshow',
    data: {
        imgList: [
            {
                url: "/public/images/slide1.jpg",
                leftContent: "《东离剑游纪》插画大赛11.1开启！",
                rightContent: "10月1日 优酷独播！"
            },
            {
                url: "/public/images/slide2.jpg",
                leftContent: "《霹雳魔封》2018年末新档大戏 11.23强势上线",
                rightContent: "霹雳视频会员活动开启！"
            },
            {
                url: "/public/images/slide3.jpg",
                leftContent: "霹雳英雄战纪之刀说异数  普通话版",
                rightContent: "刀说异数-重启篇！"
            }
        ],
        hide: false,
        currentIndex: 0,
        distance: 0, //图片移动的距离 1代表一张图片的距离 负数代表整体图片向左移动
        leftDistance: 0,// 代表整体图片向左移动的最大距离 在mounted 中初始化该值。
        rightDistance: 0,//代表整体图片向右移动的最大距离
        transitionStyle: {},
        scroll: {},
    },
    mounted: function () {
        this.leftDistance = - (this.imgList.length); //设置左边最大的移动数
        this.moveQuick(-1); //图片整体向左移动一张图片
        this.autoPlay();
        window.onscroll = () => {  // 监听窗口滚动 当滚动值大于轮播图大小 停止轮播图滚动
            if (window.pageYOffset) {
                this.scroll = {
                    x: window.pageYOffset,
                    y: window.pageXOffset
                }
            } else {
                this.scroll = {
                    x: document.documentElement.scrollLeft + document.body.scrollLeft,
                    y: document.documentElement.scrollTop + document.body.scrollTop
                }
            }
            if (this.scroll.x > this.getClientHeight()) {
                this.stopPlay();
            }
        }
    },
    methods: {
        timer: function () { }, //自动滚动图片的计时器
        autoPlay: function () {
            // var _this = this;
            // this.timer = setInterval(function () {
            //     _this.leftMoveAll();
            // }, 5000);
        },
        stopPlay: function () {//停止自动滚动图片
            clearInterval(this.timer);
        },
        moveDistance: function () {//移动图片
            this.transitionStyle = {
                transition: 'transform 1s ease-in-out',
                transform: 'translateX(' + this.distance * 100 + '%)',
            };
        },
        moveQuick: function (distance) {
            this.distance = distance;
            this.transitionStyle = {
                transition: 'none',
                transform: 'translateX(' + this.distance * 100 + '%)',
            };
        },
        rightMoveAll: function () { //整体图片向右移动
            this.distance++;
            setTimeout(() => { //点击后图片介绍隐藏
                this.hide = true;
            }, 100);
            setTimeout(() => {  //当图片切换成功后  显示新的图片介绍
                this.currentIndex--;
                if (this.currentIndex < 0) {
                    this.currentIndex = this.imgList.length - 1;
                }
                this.hide = false;
            }, 700);
            if (this.distance > this.rightDistance) {
                setTimeout(() => {
                    this.distance = this.leftDistance + 1;
                    this.moveDistance();
                }, 200);
                this.moveQuick(this.leftDistance); //快速移动到最后一张图
                return;
            }
            this.moveDistance();
        },
        leftMoveAll: function () { //整体图片向左移动
            this.distance--;
            setTimeout(() => {
                this.hide = true;
            }, 300);
            setTimeout(() => {
                this.currentIndex++;
                if (this.currentIndex >= this.imgList.length) {
                    this.currentIndex = 0;
                }
                this.hide = false;
            }, 700);
            if (this.distance < this.leftDistance) {
                setTimeout(() => {
                    this.distance = -1;
                    this.moveDistance();
                }, 100);
                this.moveQuick(this.rightDistance); //快速移动到最前一张图
                return;
            }
            this.moveDistance();
        },
        nextMove: function () { //移动到下一张图片
            clearInterval(this.timer);
            this.leftMoveAll();
            this.autoPlay();
        },
        preMove: function () { //移动到前一张图片
            clearInterval(this.timer);
            this.rightMoveAll();
            this.autoPlay();
        },
        getClientHeight: function () {
            var clientHeight = 0;
            if (window.innerHeight)
                clientHeight = window.innerHeight;
            else if ((document.body) && (document.body.clientHeight))
                clientHeight = document.body.clientHeight;
            return clientHeight;
        },
    },
});

var container = new Vue({
    delimiters: ['${', '}'],
    el: '#container',
    data: {
        containerList: [
            { title: '霹雳世界', imgUrl: '../public/images/new1.png' },
            { title: '霹雳人物', imgUrl: '../public/images/new2.png' },
            { title: '霹雳音乐', imgUrl: '../public/images/new3.png' },
            { title: '霹雳武器', imgUrl: '../public/images/new4.png' },
            { title: '霹雳图库', imgUrl: '../public/images/new5.png' },
        ],
        currentIndex: 0,
        itemBGImag: '/public/images/bg.png',
    },
    methods: {
        show: function (index) {
            this.currentIndex = index;
        },
        seleted: function (index) {
            if (this.currentIndex == index) {
                return 'seleted'
            }
        },
        getBGImage: function (index) { //如果是当前图片 返回背景色图
            if (this.currentIndex == index)
                return this.itemBGImag;
            else
                return '';
        }

    },

})

var reco = new Vue({
    delimiters: ['${', '}'],
    el: '#reco',
    data: {
        textList: [
            {
                imgUrl: '../public/images/text1.jpg', title: '霹雳天命之战祸邪神', content: '\
	                                      八部齐现神州荡，道法顶峰染秋水，无欲脱俗谈文武，龙脑再扬圣龙威\
                                    人觉非常君的阴谋算计，使得奉天逍遥以及一页书等武林栋梁惨亏其手下，一一陨落，血闇之力更被其利用，\
                                    造成神州的空前危机。此时，潜藏在神州的危机也一一爆发，天邪八部众陆续问世，踏...  \ '},
            {
                imgUrl: '../public/images/text2.jpg', title: '霹雳天命之战祸邪神Ⅱ破邪传', content: ' 邪神觉醒神州动，梵天救世纳天命，心在人间莫言悔，神愆御命帝龙行。\
武林动乱不止，八部众群起进攻，御天者号令众人侵略神州。云海仙门、德风古道、道武王谷，武林群侠挺身而出，剑子仙迹、谈无欲、云徽子、玉离经众人力战天邪八部众，双方互有胜负，也使...                            '},
            {
                imgUrl: '../public/images/text4.jpg', title: '霹雳天命之仙魔鏖锋Ⅱ斩魔录', content: ' 末日十七殉道行，厄祸之始鬼神惊。\
风云尽写斩魔录，邪心魔佛动苍穹。\
武林风云卷动，瞬息万变。有生之莲解锋镝为了挽救一线生，决意挺身一探险境。解锋镝在夸幻之父身上寄下武林希望，随后牵制斡旋各方势力，最终踏上仙脚之巅，化为清香白莲\素还真，在云...                                ',
            },
            { imgUrl: '../public/images/text5.jpg', title: '霹雳魔封', content: ' 龙脑青阳子久违再出，挺身率领圣龙口一战来自炽炼界的异魔者六弒荒魔！乱世之秋，三教再出，佛剑分说与剑子仙迹、疏楼龙宿，三人即将再续三教顶峰之会。面对三教之战，莫召奴、谈无欲、净琉璃又要如何力挽狂澜？欲知一连串精彩结果，尽在霹雳魔封。' }
        ],
        currentIndex: 0,
        distance: 50, //图片下移的大小
        scale: 0.1, //图片每次缩小的比例
        itemList: [], //保存状态
    },
    mounted: function () {
        this.preIndex = 0;
        let length = this.textList.length;
        for (var i = 0; i < length; i++) {
            let imgInfo = {};
            imgInfo.index = i;
            imgInfo.scale = 1 - i * this.scale;
            imgInfo.zIndex = length - i;
            imgInfo.top = i * this.distance;
            this.itemList.push(imgInfo);
        }
    },
    methods: {
        isShow: function (index) {
            return index == this.currentIndex ? 'block' : 'none';
        },
        prePage: function () {
            this.textList.unshift(this.textList.pop());
        },
        nextPage: function () {
            this.textList.push(this.textList.shift());
        },
        liStyle: function (index) { 
            var top = this.itemList[index].top;
            var zIndex = this.itemList[index].zIndex;
            return {
                'top': top + 'px',
                'z-index': zIndex,
            }
        },
        imgStyle: function (index) {
            var scale = this.itemList[index].scale;
            return { 'transform': 'scale(' + scale + ')' }
        },


    },

})


