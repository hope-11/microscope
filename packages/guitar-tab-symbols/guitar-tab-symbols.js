
"use strict";

SVG = require('svg.js');
var parameters = require('./parameters.js');

var guitarTab = parameters.guitarTab;

SVG.guitarTab = guitarTab;
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

                //symbol.width = this.notationHeadWidth();
                symbol.height = guitarTab.headHeight(i + 1);
                //symbol.notationDistance = this.notationHeadDistance();
                //symbol.guitarTabHeight = this.guitarTabHeight();
                //symbol.numberedTabHeight = this.numberedTabHeight();

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

        guitarBar: function(draw, x, y, width, barData, beatPerBar, notePerBeat) {

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

                    var currentNoteTimer, lastNoteTimer, nextNoteTimer;

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
        },
        numberedBar: function (draw, x, y, width, barData, beatPerBar, notePerBeat) {

            var notationHeadSymbols = draw.notationHeadSymbols;
            var numberedTabHeight = guitarTab.numberedNotationHeight();

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

            var noteX = x + noteDistance - 1;
            var noteY = y;

            for (var i = 0; i < noteNum; i++) {
                var note = barData[i];

                //音符
                var notation = typeof note.notation === 'undefined' ? 0 : note.notation;
                //音符时值
                var noteTimer = typeof note.noteTimer === 'undefined' ? 16 : note.noteTimer;

                //绘制音符
                var noteSymbol = draw.notation(notation, noteTimer).move(noteX, noteY);

                //音符底部横线的位置、距离、长度
                var noteLineY = noteSymbol.lineY;
                var noteLineDistance = noteSymbol.lineDistance;
                var noteLineLength = noteSymbol.lineLength;

                //累加时值
                sumTimer = sumTimer + noteTimer;

                //如果上一次累加时值为0，则说明是该小组第一个音符，不画连线
                if (lastSumTimer === 0) {
                    //如果当前累加时值等于每小组的时值和，则该小组结束
                    if (sumTimer >= timerPerBeat * noteJoin) {
                        //累加时值归零
                        sumTimer = 0;
                    }
                    //当前累加时值保存到上一次累加时值，以供下一次判断使用
                    lastSumTimer = sumTimer;
                } else {
                    //如果当前累加时值大于每小组的时值和，抛出错误、归零，结束小节
                    if (sumTimer > timerPerBeat * noteJoin) {
                        //报错
                        console.log('error timer');

                        //归零
                        sumTimer = 0;
                        lastSumTimer = 0;
                    } else {
                        //否则如果当前累加时值小于等于每小组的时值和
                        //上一个音符
                        var lastNote = barData[i - 1];
                        //上一个音符时值
                        var lastNoteTimer = typeof lastNote.noteTimer === 'undefined' ? 16 : note.noteTimer;
                        //当前音符应该画几条线
                        var lineNum = Math.log(Math.floor(16 / noteTimer)) / Math.log(2) + 1;

                        //如果当前音符时值小于上一个音符时值，那么按照上一个音符的线数
                        if (noteTimer < lastNoteTimer) {
                            lineNum = Math.log(Math.floor(16 / lastNoteTimer)) / Math.log(2) + 1;
                        }

                        for (var j = 0; j < lineNum; j ++) {
                            //绘制底部横线
                            draw.line(0, noteLineY, noteDistance - noteLineLength, noteLineY).stroke({width: 1})
                                .move(noteX - noteDistance + noteLineLength / 2, noteY + noteLineY + noteLineDistance * j);
                        }

                        //如果当前累加时值小于每小组时值和
                        if (sumTimer < timerPerBeat * noteJoin) {
                            //当前累加时值保存到上一次累加时值，以供下一次判断使用
                            lastSumTimer = sumTimer;
                        } else {
                            //否则如果当前累加时值等于每小组时值和，该小组结束，当前累加时值及上一次累加时值归零
                            sumTimer = 0;
                            lastSumTimer = 0;
                        }
                    }
                }


                //歌词
                var words = note.words;
                //歌词Y坐标
                var wordY = noteY + numberedTabHeight * 1.6;
                if (typeof words !== 'undefined') {
                    for (var j = 0, n = words.length; j < n; j++) {
                        //绘制歌词
                        draw.text(words[j]).font({size: 20, anchor: 'middle'}).move(noteX, wordY);
                        //歌词Y坐标下移
                        wordY = wordY + numberedTabHeight;
                    }
                }

                //音符X坐标右移
                noteX = noteX + noteDistance;

            }

            //小节结束线
            draw.rect(1, numberedTabHeight).move(noteX, noteY);
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
        drawGuitarBar: function (draw, x, y, width, barData, beatPerBar, notePerBeat) {
            return this.put(new SVG.GuitarTab).guitarBar(draw, x, y, width, barData, beatPerBar, notePerBeat);
        },
        drawNumberedBar: function (draw, x, y, width, barData, beatPerBar, notePerBeat) {
            return this.put(new SVG.GuitarTab).numberedBar(draw, x, y, width, barData, beatPerBar, notePerBeat);
        }
    }
});

SVG.Chord = SVG.invent({
    create: 'symbol',
    inherit: SVG.Container,
    extend: {

        /**
         * 绘制和弦
         * @param chord
         * @returns {*}
         */
        drawing: function (chord) {
            var wireWidth = guitarTab.wireWidth;

            var wireDistance = guitarTab.chordWireDistance;
            var fredDistance = guitarTab.chordFredDistance;
            var fingerCircleRadius = guitarTab.chordFingerCircleRadius;
            var wireNumber = guitarTab.wireNumber;
            var fingerTextFont = guitarTab.chordFingerTextFont;
            var nameTextFont = guitarTab.chordNameTextFont;

            var gridWidth = guitarTab.chordGridWidth();
            var gridHeight = guitarTab.chordGridHeight(chord);
            var fredNumber = guitarTab.chordFredNumber(chord);
            var nameTextPosition = guitarTab.chordNameTextPosition();
            var gridOrigin = guitarTab.origin;

            //绘制和弦名称
            this.text(chord.name)
                .font(nameTextFont)
                .move(nameTextPosition.x, nameTextPosition.y);

            //绘制弦
            for (var i = 0, n = wireNumber; i < n; i++) {
                this.rect(wireWidth, gridHeight)
                    .move(gridOrigin.x + wireDistance * i, gridOrigin.y);
            }

            //绘制品柱
            for (var i = 0, n = fredNumber; i < n + 1; i++) {

                this.rect(gridWidth, wireWidth)
                    .move(gridOrigin.x, gridOrigin.y + fredDistance * i);
            }

            //绘制指位
            for (var i = 0, n = chord.fingers.length; i < n; i++) {

                //和弦中的手指
                var finger = chord.fingers[i];
                //判断手指是否为空对象，如果是空对象，不执行
                if (!$.isEmptyObject(finger)) {
                    //指位坐标
                    var fingerCirclePosition = guitarTab.chordFingerCirclePosition(finger.fred, finger.pick[0]);

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
                        var xFingerEnd = guitarTab.chordFingerCirclePosition(finger.fred, finger.pick[1]).x + fingerCircleRadius;

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
         * 绘制x样式的击弦图形
         * @param x
         * @param y
         * @returns {SVG.Picked}
         */
        pickX: function () {
            var origin = guitarTab.origin;
            var height = guitarTab.pickHeight * 0.8;
            var lineStroke = guitarTab.lineStroke;

            //绘制两条交叉线
            this.line(origin.x, origin.y, origin.x + height, origin.y + height).stroke(lineStroke);
            this.line(origin.x, origin.y + height, origin.x + height, origin.y).stroke(lineStroke);

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
            var origin = guitarTab.origin;
            var numFont = guitarTab.pickNumFont;

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
            var origin = guitarTab.origin;

            //外圈宽度
            var width = guitarTab.pickHeight * 0.8;
            //外圈高度
            var height = guitarTab.pickHeight * 2 * 0.8;
            var lineStroke = guitarTab.lineStroke;
            //外圈举行圆角半径
            var r = width / 2;

            //绘制外圈圆角矩形
            this.rect(width, height)
                .stroke(this.lineStroke)
                .fill({color: '#fff', opacity: 0})
                .radius(r)
                .move(origin.x, origin.y);

            //绘制圈内交叉线
            this.line(origin.x, origin.y + r, origin.x + width, origin.y + height - r).stroke(lineStroke);
            this.line(origin.x, origin.y + height - r, origin.x + width, origin.y + r).stroke(lineStroke);

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

            var lineStroke = guitarTab.lineStroke;
            //绘制一条直线
            this.line(origin.x, origin.y, origin.x, origin.y + lineLength).stroke(lineStroke);

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
            var rassWidth = guitarTab.pickHeight / 6;
            //曲线每小节高度
            var rassHeight = guitarTab.pickHeight / 6;
            var lineStroke = guitarTab.lineStroke;

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
                .stroke(lineStroke);

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
            var arrowWidth = guitarTab.pickHeight / 4;
            //箭头高度
            var arrowHeight = guitarTab.pickHeight / 2;
            var lineStroke = guitarTab.lineStroke;

            if (up) {
                //绘制向上箭头
                this.line(origin.x, origin.y, origin.x - arrowWidth, origin.y + arrowHeight).stroke(lineStroke);
                this.line(origin.x, origin.y, origin.x + arrowWidth, origin.y + arrowHeight).stroke(lineStroke);
            } else {
                //绘制向下箭头
                this.line(origin.x, origin.y + lineLength, origin.x - arrowWidth, origin.y + lineLength - arrowHeight).stroke(lineStroke);
                this.line(origin.x, origin.y + lineLength, origin.x + arrowWidth, origin.y + lineLength - arrowHeight).stroke(lineStroke);
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
            var origin = guitarTab.origin;
            //线长
            var lineLength = guitarTab.pickHeight * step;

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
            var origin = guitarTab.origin;

            var lineHeight = guitarTab.pickHeight;
            var lineStroke = guitarTab.lineStroke;

            this.line(origin.x, origin.y, origin.x, origin.y + lineHeight).stroke(lineStroke);

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

            var height = guitarTab.pickHeight;

            var x = x0;

            //符杆绘制开关
            var isHandle = true;

            //遍历击弦数组
            for (var j = 0, pl = picks.length; j < pl; j++) {
                //该击弦图形在乐谱上的y坐标
                var y = y0 + (pl - j - 1) * height;

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
         * 谱头部图形
         * @param guitarNum 吉他数
         * @returns {SVG.Wire}
         */
        head: function (guitarNum) {
            var origin = guitarTab.origin;

            var wireDistance = guitarTab.guitarWireDistance;

            //乐谱起始竖线宽度
            var headLineWidth = guitarTab.wireWidth;
            //乐谱起始竖线高度
            var headLineHeight = guitarTab.headHeight(guitarNum);

            //大括号宽度
            var bracketWidth = guitarTab.wireWidth * 3;
            //大括号高度
            var bracketHeight = headLineHeight + wireDistance * 2;

            //大括号顶端曲线起点
            var bracketTopPathOrigin = {
                x: origin.x,
                y: origin.y + wireDistance
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
                y: bracketTopPathOrigin.y + wireDistance
            };
            //乐谱起始竖线
            this.rect(headLineWidth, headLineHeight).move(headLineOrigin.x, headLineOrigin.y);

            //弦
            for (var i = 0, n = guitarNum; i < n; i++) {
                //起点
                var x0 = headLineOrigin.x;
                var y0 = headLineOrigin.y + (guitarTab.guitarNotationHeight() + guitarTab.notationDistance()) * i;

                //绘制弦
                for (var j = 0, m = guitarTab.wireNumber; j < m; j++) {
                    this.rect(guitarTab.guitarHeadWireLength, guitarTab.wireWidth).move(x0, y0 + wireDistance * j);
                }

                //字符TAB
                var tabText = 'TAB';
                for (var j = 0, m = tabText.length; j < m; j++) {
                    this.text(tabText.charAt(j)).font(guitarTab.guitarHeadTextFont).move(x0 + 18, y0 - 8 + 20 * j);
                }
            }

            this.move(- bracketTopPathOrigin.x, - headLineOrigin.y);

            return this;
        },

        bar: function (width) {
            var wireNum = guitarTab.wireNumber;
            var wireWidth = guitarTab.wireWidth;
            var wireDistance = guitarTab.guitarWireDistance;

            for (var i = 0, n = wireNum; i < n; i++) {
                this.rect(width, wireWidth).move(0, i * wireDistance);
            }
            this.rect(wireWidth, wireDistance * (wireNum - 1) + wireWidth).move(width - 1, 0);

            return this;
        }
    },
    construct: {
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
         * 将数字转成音符图形
         * @param num           数字
         * @param noteTimer     时值
         * @returns {SVG.NumberedMusicalNotation}
         */
        turnNotation: function (num, noteTimer) {

            var r = guitarTab.numberedDotRadius;
            var textFont = guitarTab.numberedTextFont
            var fontSize = textFont.size;

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
            this.text(musicalScale + '').font(textFont).move(0, 0);

            if (guitarTab.maxTimer % noteTimer > 0) {
                //如果128对该音符时值取余大于0，说明该音符为浮点音符，在音符右侧绘制半音圆点
                this.circle(guitarTab.dottedRadius * 2).fill('#000').move(fontSize / 3, fontSize / 2 - 2);
            }

            // 高音或低音点的标记坐标
            var dotX = 0;
            var dotY = fontSize - 2;
            var lineDistance = r * 2;
            var lineLength = fontSize / 2;

            // 音符时值小于等于16的，在底部绘制横线
            if (noteTimer <= 16) {
                //计算底部横线数量，8分音符1条，16分音符2条，32分音符3条……
                var lineNum = Math.log(Math.floor(16 / noteTimer)) / Math.log(2) + 1;

                //将底部横线的距离和Y坐标挂在到this下
                this.lineY = dotY + lineDistance;
                this.lineDistance = lineDistance;
                this.lineLength = lineLength;

                for (var j = 0; j < lineNum; j++) {

                    dotY = dotY + lineDistance;
                    //绘制底部横线
                    this.line(0, 0, lineLength, 0).stroke({width: 1}).move(dotX - lineLength / 2, dotY);
                }
            }

            dotY = dotY - lineDistance;
            for (var i = 0; i < dotNum; i++){
                if (num >= 0) {
                    // 绘制在音节上面
                    dotY = - r * (i * 3 + 1);
                } else {
                    //绘制在音节下面
                    dotY = dotY + r * 3;
                }
                //绘制点
                this.circle(r * 2).fill('#000').move(dotX - r, dotY);
            }

            return this;
        }
    },
    construct: {
        notation: function (num, noteTimer) {
            return this.put(new SVG.NumberedMusicalNotation).turnNotation(num, noteTimer);
        }
    }

});