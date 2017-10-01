/**
 * Created by houpeng on 2017/9/29.
 */

let guitarTab = require('./parameters.js').guitarTab;

SVG.Wire = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {

        /**
         * 大括号顶端
         * @param x
         * @param y
         * @returns {SVG.Wire}
         */
        bracketTop: function (x, y) {

            let wireDistance = guitarTab.guitarWireDistance;

            //大括号顶端绘图路径数组
            let bracketTopPathArray = [];

            bracketTopPathArray.push('M', x, y);
            bracketTopPathArray.push('q', wireDistance * 2/3, - wireDistance / 6, wireDistance, - wireDistance / 3);
            bracketTopPathArray.push('q', - wireDistance / 2, wireDistance / 2, - wireDistance, wireDistance * 2/3);

            this.path(bracketTopPathArray);

            return this;

        },

        /**
         * 大括号底端
         * @param x
         * @param y
         * @returns {SVG.Wire}
         */
        bracketBottom: function (x, y) {

            let wireDistance = guitarTab.guitarWireDistance;

            //大括号底端曲线数组
            let bracketBottomPathArray = [];

            bracketBottomPathArray.push('M', x, y);
            bracketBottomPathArray.push('q', wireDistance * 2/3, wireDistance / 6, wireDistance, wireDistance / 3);
            bracketBottomPathArray.push('q', - wireDistance / 2, - wireDistance / 2, - wireDistance, - wireDistance * 2/3);

            this.path(bracketBottomPathArray);

            return this;

        },

        /**
         * 大括号底端
         * @param x
         * @param y
         * @param guitarNum 吉他数量
         * @returns {SVG.Wire}
         */
        bracketLine: function (x, y, guitarNum) {

            let bracketWidth = guitarTab.wireWidth * 3;
            let bracketHeight = guitarTab.notationHeadHeight(guitarNum) + guitarTab.guitarWireDistance * 2;

            this.rect(bracketWidth, bracketHeight).move(x, y);

            return this;
        },

        /**
         * 谱头部竖线
         * @param x
         * @param y
         * @param guitarNum 吉他数量
         * @returns {SVG.Wire}
         */
        tabHeadLine: function (x, y, guitarNum) {

            let bracketWidth = guitarTab.wireWidth;
            let bracketHeight = guitarTab.notationHeadHeight(guitarNum);

            this.rect(bracketWidth, bracketHeight).move(x, y);

            return this;
        },

        /**
         * 弦及文字
         * @param x
         * @param y
         * @param guitarNum 吉他数量
         * @returns {SVG.Wire}
         */
        tabHeadWires: function (x, y, guitarNum) {

            let wireDistance = guitarTab.guitarWireDistance;

            //弦
            for (let i = 0, n = guitarNum; i < n; i++) {

                //起点
                let y0 = y + (guitarTab.guitarNotationHeight() + guitarTab.notationDistance()) * i;

                //绘制弦
                for (let j = 0, m = guitarTab.wireNum; j < m; j++) {
                    this.rect(guitarTab.guitarHeadWireLength, guitarTab.wireWidth)
                        .move(x, y0 + wireDistance * j);
                }

                //绘制文字'TAB'
                let tabText = guitarTab.guitarHeadText;
                for (let j = 0, m = tabText.length; j < m; j++) {
                    this.text(tabText.charAt(j)).font(guitarTab.guitarHeadTextFont)
                        .move(x + 18, y0 + guitarTab.guitarHeadTextFont.size * j);
                }
            }

            return this;
        },

        /**
         * 谱头部图形
         * @param guitarNum 吉他数
         * @returns {SVG.Wire}
         */
        head: function (guitarNum) {

            let wireDistance = guitarTab.guitarWireDistance;

            //乐谱起始竖线宽度
            let headLineWidth = guitarTab.wireWidth;
            //乐谱起始竖线高度
            let headLineHeight = guitarTab.notationHeadHeight(guitarNum);

            //绘制大括号顶端
            this.bracketTop(0, - wireDistance);
            //绘制大括号底端
            this.bracketBottom(0, headLineHeight + wireDistance);
            //绘制大括号竖线
            this.bracketLine(0, - wireDistance, guitarNum);
            //绘制谱头部竖线
            this.tabHeadLine(headLineWidth * 6, 0, guitarNum);
            //绘制弦及文字'TAB'
            this.tabHeadWires(headLineWidth * 6, 0, guitarNum);

            return this;
        },

        bar: function (width) {
            let wireNum = guitarTab.wireNum;
            let wireWidth = guitarTab.wireWidth;
            let wireDistance = guitarTab.guitarWireDistance;

            for (let i = 0, n = wireNum; i < n; i++) {
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
