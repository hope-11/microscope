/**
 * Created by houpeng on 2017/9/29.
 */

let guitarTab = require('./parameters.js').guitarTab;

SVG.Chord = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {

        /**
         * 绘制和弦
         * @param chord
         * @returns {*}
         */
        chord: function (chord) {
            let wireWidth = guitarTab.wireWidth;

            let wireDistance = guitarTab.chordWireDistance;
            let fredDistance = guitarTab.chordFredDistance;
            let fingerCircleRadius = guitarTab.chordFingerCircleRadius;
            let wireNum = guitarTab.wireNum;
            let fingerTextFont = guitarTab.chordFingerTextFont;
            let nameTextFont = guitarTab.chordNameTextFont;

            let gridWidth = guitarTab.chordGridWidth();
            let gridHeight = guitarTab.chordGridHeight(chord);
            let fredNumber = guitarTab.chordFredNumber(chord);
            let nameTextPosition = guitarTab.chordNameTextPosition();

            //绘制和弦名称
            this.text(chord.name)
                .font(nameTextFont)
                .move(nameTextPosition.x, nameTextPosition.y);

            //绘制弦
            for (let i = 0, n = wireNum; i < n; i++) {
                this.rect(wireWidth, gridHeight)
                    .move(wireDistance * i, 0);
            }

            //绘制品柱
            for (let i = 0, n = fredNumber; i < n + 1; i++) {

                this.rect(gridWidth, wireWidth)
                    .move(0, fredDistance * i);
            }

            //绘制指位
            for (let i = 0, n = chord.fingers.length; i < n; i++) {

                //和弦中的手指
                let finger = chord.fingers[i];
                //判断手指是否为空对象，如果是空对象，不执行
                if (!$.isEmptyObject(finger)) {
                    //指位坐标
                    let fingerCirclePosition = guitarTab.chordFingerCirclePosition(finger.fred, finger.pick[0]);

                    //只有起始品位存在并且不为1时才标记，起始品位，否则不需标记
                    if (chord.startFred && chord.startFred !== 1) {
                        //绘制起始品位
                        this.text(chord.startFred + '')
                            .font(fingerTextFont)
                            .fill('#000')
                            .move(- wireDistance / 2,  fredDistance / 2 - fingerTextFont.size / 2);
                    }

                    //如果pick数组长度为2，则为横按
                    if (finger.pick[1]) {
                        //横按起始弦位
                        let xFingerStart = fingerCirclePosition.x + fingerCircleRadius * 5 / 4;
                        //横按结束弦位，一般为1弦
                        let xFingerEnd = guitarTab.chordFingerCirclePosition(finger.fred, finger.pick[1]).x + fingerCircleRadius;

                        let yFinger = fingerCirclePosition.y + fingerCircleRadius;
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

            return this;
        }
    },
    construct: {
        chorded: function (chord) {
            return this.put(new SVG.Chord).chord(chord);
        }
    }
});
