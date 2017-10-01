/**
 * Created by houpeng on 2017/10/1.
 */

let guitarTab = require('./parameters.js').guitarTab;

SVG.Link = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {

        /**
         * 浮点
         * @param x
         * @param y
         * @returns {SVG.Link}
         */
        dot: function (x, y) {

            //浮点半径
            let dottedRadius = guitarTab.dottedRadius;

            //绘制圆
            this.circle(dottedRadius * 2)
                .fill('#000')
                .move(x - dottedRadius, y - dottedRadius);

            return this;
        },

        /**
         * 吉他音符符尾
         * @param x
         * @param y
         * @param length    符尾长度，0为曲线符尾，正值为向右画横线，负值为向左画横线
         * @param timer     音符时值，用来确定绘制几条符尾
         */
        guitarNoteHook: function (x, y, length, timer) {

            //符尾数量
            let noteHookNum = guitarTab.noteHookNum(timer);

            if (length === 0) {
                //无连接线符尾


                //避免浮点绘制出错
                length = 1;
            } else {

                for (let j = 0; j < noteHookNum; j++) {
                    //符尾横线
                    this.line(x, y, x + length, y).stroke({width: guitarTab.guitarNoteHookWidth});
                    //Y坐标上移
                    y -= guitarTab.guitarNoteHookDistance;
                }

            }

            if (guitarTab.isDottedNote(timer)) {
                //浮点
                this.dot(x + guitarTab.dotDistance * length / Math.abs(length), y);
            }

            return this;
        },

        numberedNoteLink: function () {

        },

        legato: function () {

        }
    },
    construct: {
        guitarNoteHooked: function (x, y, length, hookNum) {
            return this.put(new SVG.Link).guitarNoteHook(x, y, length, hookNum);
        }
    }
});