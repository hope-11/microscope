/**
 * Created by houpeng on 2017/10/1.
 */

let guitarTab = require('./parameters.js').guitarTab;

SVG.NumberedBar = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        numberedBar: function (x, y, width, barData, beatPerBar, notePerBeat) {

            let numberedTabHeight = guitarTab.numberedNotationHeight();

            //最大时值
            let maxTimer = 128;
            //时值累加
            let sumTimer = 0;
            //上一次时值累加
            let lastSumTimer = 0;
            //该乐谱中每一拍的时值
            let timerPerBeat = maxTimer / notePerBeat;

            //该小节内音符的总数
            let noteNum = barData.length;
            //音符间距
            let noteDistance = width / (noteNum + 1);
            //音符连接，默认1拍
            let noteJoin = 1;
            //如果每小节大于等于6拍，并且是3的倍数，则3拍为一组连接
            if (beatPerBar >= 6 && beatPerBar % 3 === 0){
                noteJoin = 3;
            }

            let noteX = x + noteDistance - 1;
            let noteY = y;

            for (let i = 0; i < noteNum; i++) {
                let numbered = barData[i];

                //音符
                let note = typeof numbered.note === 'undefined' ? 0 : numbered.note;
                //音符时值
                let timer = typeof numbered.timer === 'undefined' ? 16 : numbered.timer;

                //绘制音符
                let noteSymbol = this.numberedNoted(note, timer).move(noteX, noteY);

                //音符底部横线的位置、距离、长度
                let noteLineY = noteSymbol.lineY;
                let noteLineDistance = noteSymbol.lineDistance;
                let noteLineLength = noteSymbol.lineLength;

                //累加时值
                sumTimer = sumTimer + timer;

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
                        console.log('numbered error timer');

                        //归零
                        sumTimer = 0;
                        lastSumTimer = 0;
                    } else {
                        //否则如果当前累加时值小于等于每小组的时值和
                        //上一个音符
                        let lastNumbered = barData[i - 1];
                        //上一个音符时值
                        let lastTimer = typeof lastNumbered.timer === 'undefined' ? 16 : numbered.timer;
                        //当前音符应该画几条线
                        let noteHookNum = Math.log(Math.floor(16 / timer)) / Math.log(2) + 1;

                        //如果当前音符时值小于上一个音符时值，那么按照上一个音符的线数
                        if (timer < lastTimer) {
                            noteHookNum = Math.log(Math.floor(16 / lastTimer)) / Math.log(2) + 1;
                        }

                        for (let j = 0; j < noteHookNum; j ++) {
                            //绘制底部横线
                            this.line(0, noteLineY, noteDistance - noteLineLength, noteLineY).stroke({width: 1})
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
                let words = numbered.words;

                //歌词Y坐标
                let wordY = noteY + numberedTabHeight * 1.6;
                if (typeof words !== 'undefined') {
                    for (let j = 0, n = words.length; j < n; j++) {
                        //绘制歌词
                        this.text(words[j]).font({size: 20, anchor: 'middle'}).move(noteX, wordY);
                        //歌词Y坐标下移
                        wordY = wordY + numberedTabHeight;
                    }
                }

                //音符X坐标右移
                noteX = noteX + noteDistance;

            }

            //小节结束线
            this.rect(1, numberedTabHeight).move(noteX, noteY);
        }
    },
    construct: {
        drawNumberedBar: function (x, y, width, barData, beatPerBar, notePerBeat) {
            return this.put(new SVG.NumberedBar).numberedBar(x, y, width, barData, beatPerBar, notePerBeat);
        }
    }
});



