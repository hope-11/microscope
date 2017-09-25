/**
 * Created by houpeng on 2017/9/22.
 */

export var guitarTab = {

    //全局

    //弦数量
    wireNumber: 6,
    //弦线宽
    wireWidth: 1,
    //绘图线样式
    lineStroke: {width: 1},
    //绘图原点
    origin: {x: 50, y: 50},
    //符点半径
    dottedRadius: 2,
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

    //吉他谱

    //六线谱弦间距
    guitarWireDistance: 12,
    //谱头部弦长
    guitarHeadWireLength: 72,
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
    chordGridWidth: function () {
        return this.chordWireDistance * (this.wireNumber - 1) + this.wireWidth;
    },
    /**
     * 获取网格高度
     * @returns {number}
     * @private
     */
    chordGridHeight: function (chord) {
        return this.chordFredDistance * this.chordFredNumber(chord);
    },

    /**
     * 获取和弦名称文字位置
     * @returns {{x: number, y: number}}
     * @private
     */
    chordNameTextPosition: function () {
        var x = this.origin.x + this.chordGridWidth() / 2;
        var y = this.origin.y - this.chordNameTextFont.size;
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
        var x = this.origin.x + (this.wireNumber - pick) * this.chordWireDistance - this.chordFingerCircleRadius;
        //指位编号所在品格的位置坐标，即Y轴坐标，（品位号 * 品距） - 半个品距 - 指圆半径
        var y = this.origin.y + fred * this.chordFredDistance - this.chordFredDistance / 2 - this.chordFingerCircleRadius;
        return {x: x, y: y};

    },

    /**
     * 头部宽度
     * @returns {number}
     */
    headWidth: function () {
        return this.guitarHeadWireLength + this.wireWidth * 6;
    },

    /**
     * 头部高度，与吉他的数量有关
     * @param guitarNum
     * @returns {*}
     */
    headHeight: function(guitarNum) {
        return (this.guitarNotationHeight() + this.notationDistance()) * guitarNum + this.numberedNotationHeight();
    },

    /**
     * 吉他线谱的高度
     * @returns {number}
     */
    guitarNotationHeight: function () {
        return (this.wireNumber - 1) * this.guitarWireDistance;
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


};

