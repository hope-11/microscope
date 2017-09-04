
"use strict";

SVG = require('svg.js');

SVG.Chord = SVG.invent({
    create: 'symbol',
    inherit: SVG.Container,
    extend: {

        /**
         * 绘图线宽
         */
        lineWidth: 1,

        /**
         * 弦间距
         */
        wireDistance: 9,

        /**
         * 品柱间距
         */
        fredDistance: 16,

        /**
         * 指位编号的背景圆形半径
         */
        fingerCircleRadius: 6,

        /**
         * 弦数量
         */
        wireNumber: 6,

        /**
         * 手指符号文字
         */
        fingerTextFont: {
            size: 12,                   //文字尺寸
            weight: 'bold',             //粗体
            anchor: 'middle'            //居中
        },

        /**
         * 和弦名称文字
         */
        nameTextFont: {
            size: 16,                   //文字尺寸
            anchor: 'middle'            //居中
        },

        /**
         * 计算应绘制的品位数
         * @returns {number}
         * @private
         */
        fredNumber: function (chord) {
            //默认3个品格
            var num = 3;
            //遍历和弦指位元素，有品位超过3的，则取代
            chord.fingers.forEach(function(finger){
                var fred = finger.fred;
                if (fred > num){
                    num = fred;
                }
            });
            return num;
        },

        /**
         * 获取网格宽度
         * @returns {number}
         * @private
         */
        gridWidth: function () {
            return this.wireDistance * (this.wireNumber - 1) + this.lineWidth;
        },

        /**
         * 获取网格高度
         * @returns {number}
         * @private
         */
        gridHeight: function (chord) {
            return this.fredDistance * this.fredNumber(chord);
        },


        /**
         * 获取和弦名称文字位置
         * @returns {{x: number, y: number}}
         * @private
         */
        nameTextPosition: function () {
            var x = this.gridOrigin().x + this.gridWidth() / 2;
            var y = 0;
            return {x: x, y: y};
        },

        /**
         * 设置网格绘制的坐标原点
         * @returns {{x: number, y: number}}
         * @private
         */
        gridOrigin: function () {
            var x = this.nameTextFont.size;
            var y = this.nameTextFont.size;
            return {x: x, y: y};
        },

        /**
         * 计算指位圆心坐标
         * @param fred
         * @param pick
         * @returns {{x: number, y: number}}
         * @private
         */
        fingerCirclePosition: function (fred, pick) {
            //指位编号所在弦的位置坐标，即X轴坐标，（弦总数 - 弦号） * 弦距 - 指圆半径
            var x = this.gridOrigin().x + (this.wireNumber - pick) * this.wireDistance - this.fingerCircleRadius;
            //指位编号所在品格的位置坐标，即Y轴坐标，（品位号 * 品距） - 半个品距 - 指圆半径
            var y = this.gridOrigin().y + fred * this.fredDistance - this.fredDistance / 2 - this.fingerCircleRadius;
            return {x: x, y: y};

        },

        /**
         * 绘制和弦
         * @param chord
         * @returns {*}
         */
        drawing: function (chord) {
            var lineWidth = this.lineWidth;

            var wireDistance = this.wireDistance;
            var fredDistance = this.fredDistance;
            var fingerCircleRadius = this.fingerCircleRadius;
            var wireNumber = this.wireNumber;
            var fingerTextFont = this.fingerTextFont;
            var nameTextFont = this.nameTextFont;

            var gridWidth = this.gridWidth();
            var gridHeight = this.gridHeight(chord);
            var fredNumber = this.fredNumber(chord);
            var nameTextPosition = this.nameTextPosition();
            var gridOrigin = this.gridOrigin();

            //绘制和弦名称
            this.text(chord.name)
                .font(nameTextFont)
                .move(nameTextPosition.x, nameTextPosition.y);

            //绘制弦
            for (var i = 0, n = wireNumber; i < n; i++) {
                this.rect(lineWidth, gridHeight)
                    .move(gridOrigin.x + wireDistance * i, gridOrigin.y);
            }

            //绘制品柱
            for (var i = 0, n = fredNumber; i < n + 1; i++) {
                //console.log(this)
                this.rect(gridWidth, lineWidth)
                    .move(gridOrigin.x, gridOrigin.y + fredDistance * i);
            }

            //绘制指位
            for (var i = 0, n = chord.fingers.length; i < n; i++) {
                //console.log(this)
                //和弦中的手指
                var finger = chord.fingers[i];
                //判断手指是否为空对象，如果是空对象，不执行
                if (!$.isEmptyObject(finger)) {
                    //指位坐标
                    var fingerCirclePosition = this.fingerCirclePosition(finger.fred, finger.pick[0]);

                    //只有起始品位存在并且不为1时才标记，起始品位，否则不需标记
                    if (chord.startFred && chord.startFred !== 1) {
                        //绘制起始品位
                        this.text(chord.startFred + '')
                            .font(fingerTextFont)
                            .fill('#000')
                            .move(gridOrigin.x - wireDistance / 2, gridOrigin.y + fredDistance / 2 - fingerTextFont.size / 2);
                    }

                    //如果pick数组长度为2，则为横按
                    if (finger.pick[1]) {
                        //横按起始弦位
                        var xFingerStart = fingerCirclePosition.x + fingerCircleRadius * 5 / 4;
                        //横按结束弦位，一般为1弦
                        var xFingerEnd = this.fingerCirclePosition(finger.fred, finger.pick[1]).x + fingerCircleRadius;

                        var yFinger = fingerCirclePosition.y + fingerCircleRadius;
                        //绘制横按图形，两端为圆的线，宽度为指圆半径的1/2
                        this.line(xFingerStart, yFinger, xFingerEnd, yFinger)
                            .stroke({width: fingerCircleRadius, linecap: 'round'});
                        //绘制手指数字，在和弦图形相应品位的右侧
                        this.text(i + 1 + '')
                            .font(fingerTextFont)
                            .fill('#000')
                            .move(xFingerEnd + fingerCircleRadius, fingerCirclePosition.y);
                    } else {
                        //绘制指圆图形
                        this.circle(fingerCircleRadius * 2)
                            .move(fingerCirclePosition.x, fingerCirclePosition.y);
                        this.text(i + 1 + '')
                            .font(fingerTextFont)
                            .fill('#fff')
                            .move(fingerCirclePosition.x + fingerCircleRadius, fingerCirclePosition.y);
                    }
                }
            }

            //原点移动到网格左下角
            this.move( - gridOrigin.x,  - gridOrigin.y - gridHeight)

            return this;
        }
    },
    construct: {
        chord: function (chord) {
            return this.put(new SVG.Chord).drawing(chord);
        }
    }
});

SVG.Picked = SVG.invent({
    create: 'symbol',
    inherit: SVG.Container,
    extend: {

        /**
         * 图形高度
         */
        height: 12,

        /**
         * 设定绘图原点
         * @returns {{x: number, y: number}}
         */
        origin: function () {
            return {
                x: this.height / 2,
                y: this.height / 2
            }
        },

        /**
         * 线样式
         */
        lineStroke: {
            width: 1
        },

        /**
         * 数字样式
         */
        numFont: {
            size: 15,
            anchor: 'middle'
        },



        /**
         * 绘制x样式的击弦图形
         * @param x
         * @param y
         * @returns {SVG.Picked}
         */
        pickX: function () {
            var origin = this.origin();
            var height = this.height * 0.8;

            //绘制两条交叉线
            this.line(origin.x, origin.y, origin.x + height, origin.y + height).stroke(this.lineStroke);
            this.line(origin.x, origin.y + height, origin.x + height, origin.y).stroke(this.lineStroke);

            //将两条线的交叉点作为图形原点
            this.move( - height / 2 - origin.x,  - height / 2 - origin.y + 0.5);

            return this;
        },

        /**
         * 绘制数字样式的击弦图形
         * @param num
         * @returns {SVG.Picked}
         */
        pickNum: function (num) {
            var origin = this.origin();
            var numFont = this.numFont;

            /*
            this.rect(10, 1)
                .fill('#fff')
                .move(x - 5, y);
            */

            //绘制文字，并将文字上移半个字高
            this.text(num + '')
                .font(numFont)
                .fill('#000')
                .move(origin.x, origin.y - numFont.size / 2 );

            //将文字中心作为图形原点
            this.move(- origin.x, - origin.y);

            return this;
        },

        /**
         * 绘制击弦样式的击弦图形
         * @returns {SVG.Picked}
         */
        pickSlap: function () {
            var origin = this.origin();

            //外圈宽度
            var width = this.height * 0.8;
            //外圈高度
            var height = this.height * 2 * 0.8;
            //外圈举行圆角半径
            var r = width / 2;

            //绘制外圈圆角矩形
            this.rect(width, height)
                .stroke(this.lineStroke)
                .fill({color: '#fff', opacity: 0})
                .radius(r)
                .move(origin.x, origin.y);

            //绘制圈内交叉线
            this.line(origin.x, origin.y + r, origin.x + width, origin.y + height - r).stroke(this.lineStroke);
            this.line(origin.x, origin.y + height - r, origin.x + width, origin.y + r).stroke(this.lineStroke);

            //将两条线的交叉点作为图形原点
            this.move( - width / 2 - origin.x,  - height / 2 - origin.y + 0.5);

            return this;
        },

        /**
         * 扫弦样式
         * @param origin 绘图起点
         * @param lineLength 线长
         * @returns {SVG.Picked}
         */
        sweepStyle: function (origin, lineLength) {
            //绘制一条直线
            this.line(origin.x, origin.y, origin.x, origin.y + lineLength).stroke(this.lineStroke);

            return this;
        },

        /**
         * 琶音样式
         * @param origin 绘图起点
         * @param lineLength 线长
         * @returns {SVG.Picked}
         */
        rassStyle: function (origin, lineLength) {
            //曲线单边宽度
            var rassWidth = this.height / 6;
            //曲线每小节高度
            var rassHeight = this.height / 6;

            //定义曲线路径数组
            var pathArray = [];
            //曲线起点
            pathArray.push('M', origin.x, origin.y);
            //二次贝塞尔曲线第一段
            pathArray.push('Q', origin.x + rassWidth, origin.y + rassHeight, origin.x, origin.y + rassHeight * 2);
            //重复二次贝塞尔曲线，直到达到定义高度
            for (var i = 4, n = lineLength / rassHeight; i <= n; i+=2){
                pathArray.push('T', origin.x, origin.y + rassHeight * i);
            }

            //绘制此二次贝塞尔曲线
            this.path(pathArray)
                .fill('none')
                .stroke(this.lineStroke);

            return this;
        },

        /**
         * 箭头样式
         * @param origin 绘图起点
         * @param lineLength 线长
         * @param up Boolean类型，true为向上，false为向下
         * @returns {SVG.Picked}
         */
        arrowStyle: function (origin, lineLength ,up) {
            //箭头单边宽度
            var arrowWidth = this.height / 4;
            //箭头高度
            var arrowHeight = this.height / 2;

            if (up) {
                //绘制向上箭头
                this.line(origin.x, origin.y, origin.x - arrowWidth, origin.y + arrowHeight).stroke(this.lineStroke);
                this.line(origin.x, origin.y, origin.x + arrowWidth, origin.y + arrowHeight).stroke(this.lineStroke);
            } else {
                //绘制向下箭头
                this.line(origin.x, origin.y + lineLength, origin.x - arrowWidth, origin.y + lineLength - arrowHeight).stroke(this.lineStroke);
                this.line(origin.x, origin.y + lineLength, origin.x + arrowWidth, origin.y + lineLength - arrowHeight).stroke(this.lineStroke);
            }

            return this;
        },

        /**
         * 绘制扫弦图形
         * @param sweep 'sweep'为扫弦，'rass'为琶音，如果有其他值则默认为扫弦
         * @param step 跨step个弦位
         * @param up Boolean类型，true为向上，false为向下
         * @returns {SVG.Picked}
         */
        pickSweep: function (sweep, step, up) {
            //绘图起点
            var origin = this.origin();
            //线长
            var lineLength = this.height * step;

            switch (sweep) {
                case 'rass':
                    //绘制琶音曲线
                    this.rassStyle(origin, lineLength);
                    break;
                default:
                    //默认绘制扫弦线
                    this.sweepStyle(origin, lineLength);
            }

            //绘制箭头
            this.arrowStyle(origin, lineLength, up);

            //将绘图起点作为图形的原点
            this.move(- origin.x, - origin.y);

            return this;
        },
        handle: function () {
            var origin = this.origin();

            var lineHeight = this.height;

            this.line(origin.x, origin.y, origin.x, origin.y + lineHeight).stroke(this.lineStroke);

            this.move(- origin.x, - origin.y - lineHeight / 2);

            return this;
        }

    },
    construct: {
        pickedX: function () {
            return this.put(new SVG.Picked).pickX();
        },
        pickedSlap: function () {
            return this.put(new SVG.Picked).pickSlap();
        },
        pickedNum: function (num) {
            return this.put(new SVG.Picked).pickNum(num);
        },
        pickedSweepUp: function (step) {
            return this.put(new SVG.Picked).pickSweep('sweep', step, true);
        },
        pickedSweepDown: function (step) {
            return this.put(new SVG.Picked).pickSweep('sweep', step, false);
        },
        pickedRassUp: function (step) {
            return this.put(new SVG.Picked).pickSweep('rass', step, true);
        },
        pickedRassDown: function (step) {
            return this.put(new SVG.Picked).pickSweep('rass', step, false);
        },
        handled: function () {
            return this.put(new SVG.Picked).handle();
        }
    }
});
