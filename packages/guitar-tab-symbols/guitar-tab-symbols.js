
"use strict";

SVG = require('svg.js');

SVG.GuitarTab = SVG.invent({
    create: 'doc',
    inherit: SVG.Container,
    extend: {
        pickSymbols: function () {
            //音符符杆
            var handled = this.handled();
            //x击弦图形
            var pickedX = this.pickedX();
            //拍弦图形
            var pickedSlap = this.pickedSlap();
            //数字图形
            var pickedNums = [];
            for (var i = 0, n = 24; i < n; i++) {
                pickedNums.push(this.pickedNum(i));
            }
            //向上扫弦图形
            var pickedSweepUps = [];
            for (var i = 0, n = 6; i < n; i++) {
                pickedSweepUps.push(this.pickedSweepUp(i));
            }
            //向下扫弦图形
            var pickedSweepDowns = [];
            for (var i = 0, n = 6; i < n; i++) {
                pickedSweepDowns.push(this.pickedSweepDown(i));
            }
            //向上琶音图形
            var pickedRassUps = [];
            for (var i = 0, n = 6; i < n; i++) {
                pickedRassUps.push(this.pickedRassUp(i));
            }
            //向下琶音图形
            var pickedRassDowns = [];
            for (var i = 0, n = 6; i < n; i++) {
                pickedRassDowns.push(this.pickedRassDown(i));
            }

            return {
                handled: handled,
                pickedX: pickedX,
                pickedSlap: pickedSlap,
                pickedNums: pickedNums,
                pickedSweepUps: pickedSweepUps,
                pickedSweepDowns: pickedSweepDowns,
                pickedRassUps: pickedRassUps,
                pickedRassDowns: pickedRassDowns
            };
        },

        chordSymbols: function () {
            return {}
        },

        notationHeadSymbols: function () {

            var maxGuitarNum = 3;

            var symbols = [];

            for (var i = 0; i < maxGuitarNum; i++) {

                var symbol = this.notationHead(i + 1);

                symbol.width = this.notationHeadWidth();
                symbol.height = this.notationHeadHeight(i + 1);
                symbol.notationDistance = this.notationHeadDistance();
                symbol.guitarTabHeight = this.guitarTabHeight();
                symbol.numberedTabHeight = this.numberedTabHeight();

                symbols.push(symbol);
            }

            return symbols;
        },
        /*
        notationSymbols: function (startNoteTimer, endNoteTimer) {

            var notations = {};

            //从128分音符开始，到浮点四分音符
            var noteTimers = [1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48];

            var startTimer = typeof (startNoteTimer) === 'undefined' ? 8 : startNoteTimer;
            var endTimer = typeof (endNoteTimer) === 'undefined' ? 48 : endNoteTimer;

            var startNum = -14;
            var endNum = 21;

            for (var i = 0, n = noteTimers.length; i <= n; i++) {

                if(noteTimers[i] >=  startTimer && noteTimers[i] <= endTimer) {

                    var timers = [];

                    for (var j = startNum, m = endNum; j <= m; j++){
                        timers.push(this.notation(j, noteTimers[i]));
                    }

                    notations['timer' + noteTimers[i]] = timers;
                }
            }

            return notations;
        },
        */

        /**
         * 小节谱线
         * @param width
         * @returns {*}
         */
        wireBarSymbol: function(width) {
            return this.wireBar(width);
        },

        /**
         * 音符连接竖线
         * @param draw
         * @param x
         * @param y
         * @returns {*}
         */
        joinLineVertical: function (draw, x, y) {
            draw.line(0, 0, 0, 12).stroke({width: 1}).move(x, y);
            return draw;
        },
        /**
         * 音符连接横线
         * @param draw  画板
         * @param x     绘图坐标x
         * @param y     绘图坐标y
         * @param length    线长
         * @param note  几分音符
         * @returns {*}
         */
        joinLineHorizontal: function (draw, x, y, length, noteTimer) {
            //计算音符连接线数量，8分音符1条，16分音符2条，32分音符3条……
            var lineNum = Math.log(Math.floor(16 / noteTimer)) / Math.log(2) + 1;

            for (var j = 0; j < lineNum; j++) {

                if (length >= 0) {
                    //如果线长为正，则向右画线
                    draw.line(0, 0, length, 0).stroke({width: 2}).move(x, y + 12 - j * 4);
                } else {
                    //否则向左画线
                    draw.line(0, 0, - length, 0).stroke({width: 2}).move(x + length, y + 12 - j * 4);

                }
            }

            return draw;
        },

        bar: function(draw, x, y, width, barData, beatPerBar, notePerBeat) {

            //初始化击弦图形
            var pickSymbols = draw.pickSymbols;
            //初始化和弦图形
            var chordSymbols = draw.chordSymbols;
            //初始化小节线
            var wireBarSymbol = draw.wireBarSymbol;

            draw.use(wireBarSymbol).move(x, y);

            if (typeof barData !== 'undefined' && barData.length > 0) {
                //最大时值
                var maxTimer = 128;
                //时值累加
                var sumTimer = 0;
                //上一次时值累加
                var lastSumTimer = 0;
                //该乐谱中每一拍的时值
                var timerPerBeat = maxTimer / notePerBeat;

                //该小节内音符的总数
                var noteNum = barData.length;
                //音符间距
                var noteDistance = width / (noteNum + 1);
                //音符连接，默认1拍
                var noteJoin = 1;
                //如果每小节大于等于6拍，并且是3的倍数，则3拍为一组连接
                if (beatPerBar >= 6 && beatPerBar % 3 === 0){
                    noteJoin = 3;
                }

                //遍历乐谱数据的弹奏数组
                for (var i = 0; i < noteNum; i++) {

                    //击弦数组
                    var picks = barData[i].picks;

                    //和弦对象
                    var chord = barData[i].chord;

                    //击弦图形在乐谱上的x坐标
                    var pickX = x + noteDistance * (i + 1);

                    //绘制击弦图形
                    draw.usePick(draw, picks, pickSymbols, pickX, y);

                    //var currentNote, lastNote, nextNote;
                    var currentNoteTimer, lastNoteTimer, nextNoteTimer;

                    //音符为几分音符，如果该音符中未定义，则默认为8分音符，时值为16
                    //currentNote = typeof(barData[i].note) === 'undefined' ? 8 : barData[i].note;
                    //当前音符时值
                    //currentNoteTimer = maxTimer / currentNote;
                    currentNoteTimer = typeof(barData[i].noteTimer) === 'undefined' ? 16 : barData[i].noteTimer;
                    if (i > 0) {
                        lastNoteTimer = typeof(barData[i - 1].noteTimer) === 'undefined' ? 16 : barData[i - 1].noteTimer;
                    }
                    if (i < noteNum - 1) {
                        nextNoteTimer = typeof(barData[i + 1].noteTimer) === 'undefined' ? 16 : barData[i + 1].noteTimer;
                    }

                    //连接线绘图在画板上的纵坐标
                    var joinLineY = y + 66;

                    //绘制连接竖线
                    this.joinLineVertical(draw, pickX, joinLineY);

                    //小于8分音符的，才绘制连接横线
                    if (currentNoteTimer <= 16) {
                        //时值累加
                        sumTimer = sumTimer + currentNoteTimer;

                        if (lastSumTimer === 0){
                            //如果上一次计算的时值之和为0，说明该音符是该小组的第一个音符，所以在右边画线
                            this.joinLineHorizontal(draw, pickX, joinLineY, noteDistance / 2, currentNoteTimer);

                            //把当前时值之和赋值给上一次，以便下个音符做判断
                            lastSumTimer = sumTimer;
                        } else if (sumTimer === timerPerBeat * noteJoin) {
                            //如果当前时值之和 等于 每一拍的时值*应连接的拍数（即应连接的时值之和），在左边画线
                            this.joinLineHorizontal(draw, pickX, joinLineY, -noteDistance / 2, currentNoteTimer);

                            //该小组结束，时值之和归0
                            sumTimer = 0;
                            lastSumTimer = 0;
                        } else if (sumTimer > timerPerBeat * noteJoin) {
                            //如果当前时值之和 等于 每一拍的时值*应连接的拍数（即应连接的时值之和），则报告问题
                            console.log('error timer');

                            //该小组结束，时值之和归0
                            sumTimer = 0;
                            lastSumTimer = 0;

                        } else {

                            //在小组起始和结束之间的音符
                            if (currentNoteTimer === lastNoteTimer && currentNoteTimer < nextNoteTimer) {

                                //如果 当前音符时值 等于 前面音符时值，并且 小于 后面音符时值
                                //左边按照 当前音符 绘线
                                this.joinLineHorizontal(draw, pickX, joinLineY, - noteDistance / 2, currentNoteTimer);
                                //右边按照 后面音符 绘线
                                this.joinLineHorizontal(draw, pickX, joinLineY, noteDistance / 2, nextNoteTimer);

                            } else if (currentNoteTimer >= lastNoteTimer && currentNoteTimer >= nextNoteTimer) {

                                //如果 当前音符时值 大于等于 前面音符时值 和 后面音符时值
                                //左右都按照 当前音符 绘线
                                this.joinLineHorizontal(draw, pickX, joinLineY, - noteDistance / 2, currentNoteTimer);
                                this.joinLineHorizontal(draw, pickX, joinLineY, noteDistance / 2, currentNoteTimer);

                            } else if (currentNoteTimer < lastNoteTimer && currentNoteTimer < nextNoteTimer) {

                                //如果 当前音符时值 小于 前面音符时值 和 后面音符时值
                                //左边按照 前面音符 绘线
                                this.joinLineHorizontal(draw, pickX, joinLineY, - noteDistance / 2, lastNoteTimer);
                                //右边按照 当前音符 绘线
                                this.joinLineHorizontal(draw, pickX, joinLineY, noteDistance / 2, currentNoteTimer);

                            } else if (currentNoteTimer < lastNoteTimer && currentNoteTimer === nextNoteTimer) {


                                //如果 当前音符时值 小于 前面音符时值，并且 等于 后面音符时值
                                //左边按照 前面音符 绘线
                                this.joinLineHorizontal(draw, pickX, joinLineY, - noteDistance / 2, lastNoteTimer);
                                //右边按照 当前音符 绘线
                                this.joinLineHorizontal(draw, pickX, joinLineY, noteDistance / 2, currentNoteTimer);
                            }
                        }
                    } else {
                        sumTimer = 0;
                        lastSumTimer = 0;
                    }

                    //绘制和弦
                    draw.useChord(draw, chord, chordSymbols, pickX, y - 12);

                }
            }
        }
    },
    construct: {
        initPickSymbols: function () {
            return this.put(new SVG.GuitarTab).pickSymbols();
        },
        initChordSymbols: function () {
            return this.put(new SVG.GuitarTab).chordSymbols();
        },
        /*
        initNotationSymbols: function (startNoteTimer, endNoteTimer) {
            return this.put(new SVG.GuitarTab).notationSymbols(startNoteTimer, endNoteTimer);
        },
        */
        initNotationHeadSymbols: function () {
            return this.put(new SVG.GuitarTab).notationHeadSymbols();
        },
        initWireBarSymbol: function (width) {
            return this.put(new SVG.GuitarTab).wireBarSymbol(width);
        },
        drawBar: function (draw, x, y, width, barData, beatPerBar, notePerBeat) {
            return this.put(new SVG.GuitarTab).bar(draw, x, y, width, barData, beatPerBar, notePerBeat);
        }
    }
});

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

                this.rect(gridWidth, lineWidth)
                    .move(gridOrigin.x, gridOrigin.y + fredDistance * i);
            }

            //绘制指位
            for (var i = 0, n = chord.fingers.length; i < n; i++) {

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
            this.move( - gridOrigin.x - wireDistance * 2/3,  - gridOrigin.y - gridHeight)

            return this;
        }
    },
    construct: {
        chord: function (chord) {
            return this.put(new SVG.Chord).drawing(chord);
        },
        useChord: function (draw, chord, chordSymbols, x0, y0) {
            //如果和弦是一个对象，即表示该音节上有一个有效的和弦
            if (typeof(chord) === 'object') {
                //如果和弦图形组中不存在该和弦
                if (typeof(chordSymbols[chord.name]) === 'undefined') {
                    //那么绘制该和弦并把这个和弦图形加入到和弦图形组中
                    chordSymbols[chord.name] = draw.chord(chord);
                }
                //使用这个和弦
                draw.use(chordSymbols[chord.name]).move(x0, y0);
            }

            return draw;
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
            this.move(- origin.x, - origin.y - numFont.size / 2);

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

            //绘制箭头，向下扫弦绘制向上箭头，向上扫弦绘制向下箭头
            this.arrowStyle(origin, lineLength, up);

            //将绘图起点作为图形的原点
            this.move(- origin.x, - origin.y - lineLength);

            return this;
        },

        /**
         * 符杆
         * @returns {SVG.Picked}
         */
        handle: function () {
            var origin = this.origin();

            var lineHeight = this.height;

            this.line(origin.x, origin.y, origin.x, origin.y + lineHeight).stroke(this.lineStroke);

            this.move(- origin.x, - origin.y - lineHeight / 2);

            return this;
        },

        /**
         * 绘制音符
         * @param draw 画板
         * @param picks 击弦数组
         * @param pickSymbols 击弦图形集合
         * @param x0
         * @param y0
         * @returns {*}
         */
        drawPicks: function (draw, picks, pickSymbols, x0, y0) {

            var x = x0;

            //符杆绘制开关
            var isHandle = true;

            //遍历击弦数组
            for (var j = 0, pl = picks.length; j < pl; j++) {
                //该击弦图形在乐谱上的y坐标
                var y = y0 + (pl - j - 1) * this.height;

                //如果数据不存在，则返回原值，否则去除前后空格
                var pick = typeof(picks[j]) === 'undefined' ? picks[j] : picks[j].trim();

                //如果pick值不存在，为空
                if (typeof(pick) === 'undefined' || pick === ''){
                    //判断是否应该绘制符杆，当已经绘制了击弦图形之后才绘制柄
                    if (isHandle) {
                        //绘制符杆
                        draw.use(pickSymbols.handled).move(x, y);
                    }
                } else {
                    //如果pick值为'X'或'x'
                    if (pick.toUpperCase() === 'X') {
                        //绘制x击弦图形
                        draw.use(pickSymbols.pickedX).move(x, y);
                        //开启符杆绘制开关
                        isHandle = false;
                        //跳出继续循环
                        continue;
                        //如果pick值为数字
                    } else if (!isNaN(pick)) {
                        //绘制数字图形
                        draw.use(pickSymbols.pickedNums[pick]).move(x, y);
                        isHandle = false;
                        continue;
                        //如果pick值为'P'或'p'
                    } else if (pick.toUpperCase() === 'P') {
                        //绘制拍弦图形
                        draw.use(pickSymbols.pickedSlap).move(x, y);
                        isHandle = false;
                        //调到下一根弦才开始绘制柄，否则柄会与拍弦图形交叠
                        j++;
                        continue;
                        //在遍历picks数据时首先遇到的扫弦值是'S'，则说明是向上扫弦箭头
                    } else if (pick === 'S') {
                        //保存当前弦位j为temp，从下一根弦开始继续遍历，寻找's'
                        for (var k = j + 1, temp = j; k < pl; k++) {
                            //如果还没找到's'，就跳到下一根弦开始绘制柄
                            j++;
                            //找到值's'，即箭头结束位置
                            if (picks[k].trim() === 's') {
                                //绘制向上扫弦箭头，跨k-temp根弦距
                                draw.use(pickSymbols.pickedSweepDowns[k - temp]).move(x, y);
                                //开启柄绘制开关
                                isHandle = false;
                                //结束并跳出该循环
                                break;
                            }

                        }
                        //在遍历picks数据时首先遇到的扫弦值是's'，则说明是向下扫弦箭头
                    } else if (pick === 's') {
                        for (var k = j + 1, temp = j; k < pl; k++) {
                            j++;
                            if (picks[k].trim() === 'S') {
                                draw.use(pickSymbols.pickedSweepUps[k - temp]).move(x, y);
                                isHandle = false;
                                break;
                            }

                        }
                        //在遍历picks数据时首先遇到的扫弦值是'R'，则说明是向上琶音箭头
                    } else if (pick === 'R') {
                        for (var k = j + 1, temp = j; k < pl; k++) {
                            j++;
                            if (picks[k].trim() === 'r') {
                                draw.use(pickSymbols.pickedRassDowns[k - temp]).move(x, y);
                                isHandle = false;
                                break;
                            }

                        }
                        //在遍历picks数据时首先遇到的扫弦值是'r'，则说明是向下琶音箭头
                    } else if (pick === 'r') {
                        for (var k = j + 1, temp = j; k < pl; k++) {
                            j++;
                            if (picks[k].trim() === 'R') {
                                draw.use(pickSymbols.pickedRassUps[k - temp]).move(x, y);
                                isHandle = true;
                                break;
                            }

                        }
                    }

                }

            }

            return draw;
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
            return this.put(new SVG.Picked).pickSweep('sweep', step, false);
        },
        pickedSweepDown: function (step) {
            return this.put(new SVG.Picked).pickSweep('sweep', step, true);
        },
        pickedRassUp: function (step) {
            return this.put(new SVG.Picked).pickSweep('rass', step, false);
        },
        pickedRassDown: function (step) {
            return this.put(new SVG.Picked).pickSweep('rass', step, true);
        },
        handled: function () {
            return this.put(new SVG.Picked).handle();
        },

        usePick: function (draw, picks, pickSymbols, x0, y0) {
            return this.put(new SVG.Picked).drawPicks(draw, picks, pickSymbols, x0, y0);
        }
    }
});

SVG.Wire = SVG.invent({
    create: 'symbol',
    inherit: SVG.Container,
    extend: {
        /**
         * 弦数量
         */
        wireNum: 6,

        /**
         * 弦线宽
         */
        wireWidth: 1,

        /**
         * 弦距
         */
        wireDistance: 12,

        /**
         * 弦线长
         */
        wireLength: 72,

        headWidth: function () {
            return this.wireLength + this.wireWidth * 6;
        },

        headHeight: function(guitarNum) {
            return (this.guitarNotationHeight() + this.notationDistance()) * guitarNum + this.numberedNotationHeight();
        },

        textFont: {
            size: 20,                   //文字尺寸
            anchor: 'middle'            //居中
        },

        /**
         * 绘图起点
         */
        origin: {
            x: 12,
            y: 12
        },

        /**
         * 吉他谱的高度
         * @returns {number}
         */
        guitarNotationHeight: function () {
            return this.wireNum * this.wireNum + this.wireWidth;
        },

        /**
         * 谱间距
         * @returns {number}
         */
        notationDistance: function () {
            return this.wireDistance * 6;
        },

        /**
         * 简谱的高度
         * @returns {number}
         */
        numberedNotationHeight: function () {
            return this.wireDistance * 4;
        },

        /**
         * 谱头部图形
         * @param guitarNum 吉他数
         * @returns {SVG.Wire}
         */
        head: function (guitarNum) {
            var origin = this.origin;

            var wireDistance = this.wireDistance;

            //乐谱起始竖线宽度
            var headLineWidth = this.wireWidth;
            //乐谱起始竖线高度
            var headLineHeight = this.headHeight(guitarNum);

            //大括号宽度
            var bracketWidth = this.wireWidth * 3;
            //大括号高度
            var bracketHeight = headLineHeight + this.wireDistance * 2;

            //大括号顶端曲线起点
            var bracketTopPathOrigin = {
                x: origin.x,
                y: origin.y + this.wireDistance
            };
            //大括号顶端绘图路径数组
            var bracketTopPathArray = [];
            bracketTopPathArray.push('M', bracketTopPathOrigin.x, bracketTopPathOrigin.y);
            bracketTopPathArray.push('q', wireDistance * 2/3, - wireDistance / 6, wireDistance, - wireDistance / 3);
            bracketTopPathArray.push('q', - wireDistance / 2, wireDistance / 2, - wireDistance, wireDistance * 2/3);
            this.path(bracketTopPathArray);

            //大括号底端曲线起点
            var bracketBottomPathOrigin = {
                x: origin.x,
                y: bracketTopPathOrigin.y + bracketHeight
            };
            //大括号底端曲线数组
            var bracketBottomPathArray = [];
            bracketBottomPathArray.push('M', bracketBottomPathOrigin.x, bracketBottomPathOrigin.y);
            bracketBottomPathArray.push('q', wireDistance * 2/3, wireDistance / 6, wireDistance, wireDistance / 3);
            bracketBottomPathArray.push('q', - wireDistance / 2, - wireDistance / 2, - wireDistance, - wireDistance * 2/3);
            this.path(bracketBottomPathArray);

            //大括号竖线
            this.rect(bracketWidth, bracketHeight).move(bracketTopPathOrigin.x, bracketTopPathOrigin.y);

            //乐谱起始竖线起点
            var headLineOrigin = {
                x: origin.x + headLineWidth * 6,
                y: bracketTopPathOrigin.y + this.wireDistance
            };
            //乐谱起始竖线
            this.rect(headLineWidth, headLineHeight).move(headLineOrigin.x, headLineOrigin.y);

            //弦
            for (var i = 0, n = guitarNum; i < n; i++) {
                //起点
                var x0 = headLineOrigin.x;
                var y0 = headLineOrigin.y + (this.guitarNotationHeight() + this.notationDistance()) * i;

                //绘制弦
                for (var j = 0, m = this.wireNum; j < m; j++) {
                    this.rect(this.wireLength, this.wireWidth).move(x0, y0 + this.wireDistance * j);
                }

                //字符TAB
                var tabText = 'TAB';
                for (var j = 0, m = tabText.length; j < m; j++) {
                    this.text(tabText.charAt(j)).font(this.textFont).move(x0 + 18, y0 - 8 + 20 * j);
                }
            }

            this.move(- bracketTopPathOrigin.x, - headLineOrigin.y);

            return this;
        },

        bar: function (width) {
            for (var i = 0, n = this.wireNum; i < n; i++) {
                this.rect(width, this.wireWidth).move(0, i * this.wireDistance);
            }
            this.rect(this.wireWidth, this.wireDistance * (this.wireNum - 1) + this.wireWidth).move(width - 1, 0);

            return this;
        }
    },
    construct: {
        notationHeadWidth: function () {
            return this.put(new SVG.Wire).headWidth();
        },
        notationHeadHeight: function (guitarNum) {
            return this.put(new SVG.Wire).headHeight(guitarNum);
        },
        notationHeadDistance: function () {
            return this.put(new SVG.Wire).notationDistance();
        },
        guitarTabHeight: function () {
            return this.put(new SVG.Wire).guitarNotationHeight();
        },
        numberedTabHeight: function () {
            return this.put(new SVG.Wire).numberedNotationHeight();
        },
        notationHead: function (guitarNum) {
            return this.put(new SVG.Wire).head(guitarNum);
        },
        wireBar: function (width) {
            return this.put(new SVG.Wire).bar(width);
        }
    }

});

SVG.NumberedMusicalNotation = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {

        /**
         * 绘图起点
         */
        origin: {
            x: 12,
            y: 12
        },

        /**
         * 文字样式
         */
        textFont: {
            size: 20,                   //文字尺寸
            anchor: 'middle'            //居中
        },

        /**
         * 高音、低音点的半径
         */
        dotRadius: 1.6,

        /**
         * 将数字转成音符图形
         * @param num           数字
         * @param noteTimer     时值
         * @returns {SVG.NumberedMusicalNotation}
         */
        turnNotation: function (num, noteTimer) {

            var origin = this.origin;
            var r = this.dotRadius;
            var fontSize = this.textFont.size;

            //音阶
            var musicalScale = 0;
            //高音或低音，应该在音阶上面或者下面绘制几个·，0为不绘制，正值为高音，负值为低音
            var dotNum = 0;

            if (num > 0) {
                musicalScale = Math.abs((num - 1) % 7 + 1);
                dotNum = Math.ceil(num / 7) - 1;
            } else if (num < 0) {
                musicalScale = Math.abs((num + 1) % 7 - 1);
                dotNum = Math.abs(Math.floor(num / 7)) ;
            }

            //绘制数字
            this.text(musicalScale + '').font(this.textFont).move(origin.x, origin.y);

            if (128 % noteTimer > 0) {
                this.circle(r * 3).fill('#000').move(origin.x + fontSize / 3, origin.y + fontSize / 2 - 2);
            }

            // 高音或低音点的标记坐标x
            var dotX = origin.x ;

            var dotY = origin.y + fontSize - 2;

            // 音符时值小于等于16的，在底部绘制横线
            if (noteTimer <= 16) {
                //计算底部横线数量，8分音符1条，16分音符2条，32分音符3条……
                var lineNum = Math.log(Math.floor(16 / noteTimer)) / Math.log(2) + 1;

                for (var j = 0; j < lineNum; j++) {

                    dotY = dotY + r * 2;
                    this.line(0, 0, fontSize / 2, 0).stroke({width: 1}).move(dotX - fontSize / 4, dotY);
                }
            }

            dotY = dotY - r * 2;
            for (var i = 0; i < dotNum; i++){

                if (num >= 0) {
                    // 绘制在音节上面
                    dotY = origin.y - r * (i * 3 + 1);
                } else {
                    //绘制在音节下面
                    dotY = dotY + r * 3;
                }
                //绘制点
                this.circle(r * 2).fill('#000').move(dotX - r, dotY);
            }

            this.move (- origin.x, - origin.y);

            return this;
        }
    },
    construct: {
        notation: function (num, noteTimer) {
            return this.put(new SVG.NumberedMusicalNotation).turnNotation(num, noteTimer);
        }
    }

});