

var slideshow = new Vue({
    delimiters: ['${', '}'],
    el: '#slideshow',
    data: {
        imgUrl: [
            // {
            //     url: '../public/images/slide1.jpg',
            //     leftContent: '《东离剑游纪》插画大赛11.1开启！',
            //     rightContent: '10月1日 优酷独播！'
            // },
            // {
            //     url: '../public/images/slide2.jpg',
            //     leftContent: '《霹雳魔封》2018年末新档大戏 11.23强势上线',
            //     rightContent: '霹雳视频会员活动开启！'
            // },
            // {
            //     url: '../public/images/slide3.jpg',
            //     leftContent: '霹雳英雄战纪之刀说异数  普通话版',
            //     rightContent: '刀说异数-重启篇！'
            // },
        ],
        isTure: false,
        currentIndex: 0,
        distance: 0, //图片移动的距离
        minDistance: 0,
        maxDistance: 0,
        transitionStyle: {},
        scale: 100, //移到的距离增加的比例为1倍即100%
    },
    created: function () {
        this.maxDistance = 100;
        this.autoPlay();
    },
    methods: {
        timer: function () { },
        autoPlay: function () {
            var _this = this;
            this.timer = setInterval(function () {
                _this.rightMoveAll();
            }, 5000);
        },
        stopPlay:function(){
            clearInterval(this.timer);
        },
        moveDistance: function (distance, style) {
            this.distance += distance;
            this.transitionStyle = {
                transition: style,
                transform: 'translateX(' + this.distance + '%)',
            };
        },
        rightMoveAll: function () {
            setTimeout(() => {
                this.isTure = true;
            }, 300);
            setTimeout(() => {
                this.currentIndex++;
                if (this.currentIndex >= this.imgUrl.length) {
                    this.currentIndex = 0;
                }
                this.isTure = false;
            }, 700);
            if (this.distance <= this.minDistance) {
                setTimeout(() => {
                    this.moveDistance(-this.scale, 'transform 1s ease-in-out');
                }, 100);
                this.distance = 0;
                this.moveDistance(0, 'none');
                return;
            }
            this.moveDistance(-this.scale, 'transform 1s ease-in-out');
        },
        leftMoveAll: function () {
            setTimeout(() => {
                this.isTure = true;
            }, 300);
            setTimeout(() => {
                this.currentIndex--;
                if (this.currentIndex < 0) {
                    this.currentIndex = this.imgUrl.length - 1;
                }
                this.isTure = false;
            }, 700);
            if (this.distance >= this.maxDistance) {
                setTimeout(() => {
                    this.moveDistance(this.scale, 'transform 1s ease-in-out');
                }, 100);
                this.distance = this.minDistance + this.scale;
                this.moveDistance(0, 'none');
                return;
            }
            this.moveDistance(this.scale, 'transform 1s ease-in-out');
        },
        rightMove: function () {
        this.minDistance = -this.imgUrl.length * this.scale;

            clearInterval(this.timer);
            this.rightMoveAll();
            this.autoPlay();
        },
        leftMove: function () {
            clearInterval(this.timer);
            this.leftMoveAll();
            this.autoPlay();
        },
        getClientHeight: function () {
            var clientHeight = 0;
            if (window.innerHeight)
                clientHeight = window.innerHeight;
            else if ((document.body) && (document.body.clientHeight))
                clientHeight = document.body.clientHeight;
            return clientHeight + 'px';
        },
    },
}) 

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
        itemMaxWidth: 33.3,
        itemMinWidth: 16.6,
        screenWidth: 0,
        screenHeight: 0,
        containerWidth: 850,
        itemBGImag: '../public/images/bg.png',
    },

    mounted() {
        this.screenWidth = document.body.clientWidth;
        this.screenHeight = document.body.clientHeight;
        window.onresize = () => {
            return (() => {
                this.screenWidth = document.body.clientWidth;
                this.screenHeight = document.body.clientHeight;
            })();
        };
    },
    methods: {
        show: function (index) {
            this.currentIndex = index;
        },
        getItemWidth: function (index) {
            if (this.screenWidth <= this.containerWidth) {
                if (index < 3) {
                    return this.itemMaxWidth;
                } else {
                    return 50;
                }
            }
            if (this.currentIndex == index)
                return this.itemMaxWidth;
            else
                return this.itemMinWidth;
        },
        getBGImage: function (index) {
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
        preIndex: 0,
        distance: 50,
        maxZIndex: 0,
        maxScale: 1,
        scale: 0.1,
        isBegin: true,
        itemZIndex: [],
    },
    created: function () {
        this.preIndex = 0;
        this.maxZIndex = this.currentIndex = this.textList.length - 1;
        for (var i = 0; i < this.textList.length; i++) {
            this.itemZIndex.push(i);
        }
    },
    methods: {
        isShow: function (index) {
            return index == this.currentIndex ? 'block' : 'none';
        },
        nextPage: function () {
            this.isBegin = false;
            this.preIndex = this.currentIndex--;
            this.calculateZIndex();
            if (this.currentIndex < 0) {
                this.preIndex = this.currentIndex = this.textList.length - 1;
                return;
            }
        },
        prePage:function(){
            this.isBegin = false;
            this.preIndex = this.currentIndex++;
            this.calculateZIndex();
            if (this.currentIndex >this.textList.length-1) {
                this.preIndex = this.currentIndex = 0;
                return;
            }
        },
        calculateZIndex: function () {
            var length = this.itemZIndex.length - 1;
            for (var j = 0; j <= length; j++) {
                if (this.itemZIndex[j] == length) this.itemZIndex[j] = 0;
                else this.itemZIndex[j] = ++(this.itemZIndex[j]);
            }
        },
        getSacle: function (index) {
            if (this.isBegin) {
                return (this.maxScale - (this.maxZIndex - index) * this.scale);
            } else {
                return (this.maxScale - (this.maxZIndex - this.itemZIndex[index]) * this.scale);
            }
        },
        getZIndex: function (index) {
            if (this.isBegin) {
                return index;
            } else {
                return this.itemZIndex[index];
            }

        },
        getTop: function (index) {
            if (this.isBegin) {
                return (this.maxZIndex - index) * this.distance;
            } else {
                return (this.maxZIndex - this.itemZIndex[index]) * this.distance;
            }

        }
    },
    computed: {
        styleObject: function () {
            return "1111";
        }
    }
})


