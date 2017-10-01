/**
 * Created by houpeng on 2017/9/22.
 */

export let guitarTab = {

    //全局

    //弦数量
    wireNum: 6,
    //品位数量
    fredNum: 24,
    //弦线宽
    wireWidth: 1,
    //绘图线样式
    lineStroke: {width: 1},
    //绘图原点
    origin: {x: 50, y: 50},
    //符点半径
    dottedRadius: 2,
    //浮点距离音符的距离
    dotDistance: 8,
    //最大时值
    maxTimer: 128,

    //和弦

    //弦间距
    chordWireDistance: 9,
    //品柱间距
    chordFredDistance: 16,
    //指圆半径
    chordFingerCircleRadius: 6,
    //手指文字符号字体样式
    chordFingerTextFont : {size: 12, weight: 'bold', anchor: 'middle'},
    //和弦名称文字样式
    chordNameTextFont : {size: 16, anchor: 'middle'},

    //击弦

    //图形高度
    pickHeight: 12,
    //数字文字样式
    pickNumFont: {size: 15, anchor: 'middle'},
    //吉他音符符尾线宽
    guitarNoteHookWidth: 2,
    //吉他音符符尾间距
    guitarNoteHookDistance: 4,

    //吉他谱

    //六线谱弦间距
    guitarWireDistance: 12,
    //谱头部弦长
    guitarHeadWireLength: 72,
    //吉他谱头部文字
    guitarHeadText: 'TAB',
    //谱头部文字（TAB）样式
    guitarHeadTextFont: {size: 20, anchor: 'middle'},



    //简谱

    //简谱字符样式
    numberedTextFont: {size: 20, anchor: 'middle'},
    //高低音点半径
    numberedDotRadius: 1.6,

    /**
     * 计算应绘制的品位数
     * @returns {number}
     * @private
     */
    chordFredNumber: function (chord) {
        //默认3个品格
        let num = 3;
        //遍历和弦指位元素，有品位超过3的，则取代
        chord.fingers.forEach(function(finger){
            let fred = finger.fred;
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
    chordGridWidth: function () {
        return this.chordWireDistance * (this.wireNum - 1) + this.wireWidth;
    },

    /**
     * 获取网格高度
     * @returns {number}
     * @private
     */
    chordGridHeight: function (chord) {
        return this.chordFredDistance * this.chordFredNumber(chord);
    },

    chordHeight: function () {
        return this.chordNameTextFont.size + this.chordFredDistance * 6;
    },

    /**
     * 获取和弦名称文字位置
     * @returns {{x: number, y: number}}
     * @private
     */
    chordNameTextPosition: function () {
        let x = this.chordGridWidth() / 2;
        let y = - this.chordNameTextFont.size;
        return {x: x, y: y};
    },

    /**
     * 计算指位圆心坐标
     * @param fred
     * @param pick
     * @returns {{x: number, y: number}}
     * @private
     */
    chordFingerCirclePosition: function (fred, pick) {
        //指位编号所在弦的位置坐标，即X轴坐标，（弦总数 - 弦号） * 弦距 - 指圆半径
        let x = (this.wireNum - pick) * this.chordWireDistance - this.chordFingerCircleRadius;
        //指位编号所在品格的位置坐标，即Y轴坐标，（品位号 * 品距） - 半个品距 - 指圆半径
        let y = fred * this.chordFredDistance - this.chordFredDistance / 2 - this.chordFingerCircleRadius;
        return {x: x, y: y};

    },

    /**
     * 头部宽度
     * @returns {number}
     */
    notationHeadWidth: function () {
        return this.guitarHeadWireLength + this.wireWidth * 6;
    },

    /**
     * 头部高度，与吉他的数量有关
     * @param guitarNum
     * @returns {*}
     */
    notationHeadHeight: function(guitarNum) {
        return (this.guitarNotationHeight() + this.notationDistance()) * guitarNum + this.numberedNotationHeight();
    },

    /**
     * 吉他线谱的高度
     * @returns {number}
     */
    guitarNotationHeight: function () {
        return (this.wireNum - 1) * this.guitarWireDistance;
    },

    /**
     * 谱间距
     * @returns {number}
     */
    notationDistance: function () {
        return this.guitarWireDistance * 4;
    },

    /**
     * 简谱的高度
     * @returns {number}
     */
    numberedNotationHeight: function () {
        return this.guitarWireDistance * 2;
    },

    /**
     * 每一拍的时值
     * @param notePerBeat
     * @returns {number}
     */
    timerPerBeat: function (notePerBeat) {
        return this.maxTimer / notePerBeat;
    },

    /**
     * 将多少个音符连接成一个小组
     * @param beatPerBar
     * @returns {number}
     */
    noteJoin: function (beatPerBar) {
        //如果每小节大于等于6拍，并且是3的倍数，则3拍为一组连接
        if (beatPerBar >= 6 && beatPerBar % 3 === 0){
            return 3;
        } else {
            return 1;
        }
    },

    /**
     * 根据音符时值计算符尾数量，8分音符1条，16分音符2条，32分音符3条……
     * @param timer
     * @returns {number}
     */
    noteHookNum: function (timer) {
        if (timer < 32) {

            return Math.log(Math.ceil(16 / timer)) / Math.log(2) + 1;
        } else {
            return 0;
        }
    },

    /**
     * 默认为八分音符，即时值为16
     * @param timer
     * @returns {number}
     */
    noteTimer: function (timer) {
        return typeof(timer) === 'undefined' ? 16 : timer;
    },

    /**
     * 根据音符时值判断该音符是否为浮点音符
     * @param timer
     * @returns {boolean}
     */
    isDottedNote: function (timer) {
        return this.maxTimer % timer > 0;
    }

};

//SVG.guitarTab = guitarTab;

