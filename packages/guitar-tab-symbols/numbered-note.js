/**
 * Created by houpeng on 2017/9/29.
 */

let guitarTab = require('./parameters.js').guitarTab;

SVG.NumberedMusicalNotation = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {

        /**
         * 将数字转成音符图形
         * @param num           数字
         * @param timer     时值
         * @returns {SVG.NumberedMusicalNotation}
         */
        numberedNote: function (num, timer) {

            let r = guitarTab.numberedDotRadius;
            let textFont = guitarTab.numberedTextFont;
            let fontSize = textFont.size;

            //音阶
            let musicalScale = 0;
            //高音或低音，应该在音阶上面或者下面绘制几个·，0为不绘制，正值为高音，负值为低音
            let dotNum = 0;

            if (num > 0) {
                musicalScale = Math.abs((num - 1) % 7 + 1);
                dotNum = Math.ceil(num / 7) - 1;
            } else if (num < 0) {
                musicalScale = Math.abs((num + 1) % 7 - 1);
                dotNum = Math.abs(Math.floor(num / 7)) ;
            }

            //绘制数字
            this.text(musicalScale + '').font(textFont).move(0, 0);

            if (guitarTab.maxTimer % timer > 0) {
                //如果128对该音符时值取余大于0，说明该音符为浮点音符，在音符右侧绘制半音圆点
                this.circle(guitarTab.dottedRadius * 2).fill('#000').move(guitarTab.dotDistance, fontSize / 2 - 2);
            }

            // 高音或低音点的标记坐标
            let dotX = 0;
            let dotY = fontSize - 2;
            let lineDistance = r * 2;
            let lineLength = fontSize / 2;

            // 音符时值小于等于16的，在底部绘制横线
            if (timer <= 16) {
                //计算底部横线数量，8分音符1条，16分音符2条，32分音符3条……
                let noteHookNum = Math.log(Math.floor(16 / timer)) / Math.log(2) + 1;

                //将底部横线的距离和Y坐标挂在到this下
                this.lineY = dotY + lineDistance;
                this.lineDistance = lineDistance;
                this.lineLength = lineLength;

                for (let j = 0; j < noteHookNum; j++) {

                    dotY = dotY + lineDistance;
                    //绘制底部横线
                    this.line(0, 0, lineLength, 0).stroke({width: 1}).move(dotX - lineLength / 2, dotY);
                }
            }

            dotY = dotY - lineDistance;
            for (let i = 0; i < dotNum; i++){
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
        numberedNoted: function (num, timer) {
            return this.put(new SVG.NumberedMusicalNotation).numberedNote(num, timer);
        }
    }

});