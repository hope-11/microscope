

let guitarTab = require('./parameters.js').guitarTab;

SVG.GuitarBar = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {

        guitarBar: function(x, y, width, barData, beatPerBar, notePerBeat) {

            this.wireBar(width).move(x, y);

            if (typeof barData !== 'undefined' && barData.length > 0) {

                //该乐谱中每一拍的时值
                let timerPerBeat = guitarTab.timerPerBeat(notePerBeat);
                //音符连接，默认1拍
                let noteJoin = guitarTab.noteJoin(beatPerBar);

                //该小节内音符的总数
                let noteNum = barData.length;
                //音符间距
                let noteDistance = width / (noteNum + 1);

                //时值累加
                let sumTimer = 0;
                //上一次时值累加
                let lastSumTimer = 0;

                //遍历乐谱数据的弹奏数组
                for (let i = 0; i < noteNum; i++) {

                    //击弦数组
                    let picks = barData[i].picks;

                    //和弦对象
                    let chord = barData[i].chord;

                    //击弦图形在乐谱上的x坐标
                    let pickX = x + noteDistance * (i + 1);

                    let currentNoteTimer, lastNoteTimer, nextNoteTimer;

                    currentNoteTimer = guitarTab.noteTimer(barData[i].timer);

                    if (i > 0) {
                        lastNoteTimer = guitarTab.noteTimer(barData[i - 1].timer);
                    }
                    if (i < noteNum - 1) {
                        nextNoteTimer = guitarTab.noteTimer(barData[i + 1].timer);
                    }
                    //绘制击弦图形
                    this.guitarNoted(picks, currentNoteTimer).move(pickX, y);

                    //连接线绘图在画板上的纵坐标
                    let joinLineY = y + 78;

                    //小于4分音符(即时值32)的，才绘制连接横线
                    if (currentNoteTimer < 32) {
                        //时值累加
                        sumTimer = sumTimer + currentNoteTimer;

                        if (lastSumTimer === 0){
                            //如果上一次计算的时值之和为0，说明该音符是该小组的第一个音符，所以在右边画线
                            this.guitarNoteHooked(pickX, joinLineY, noteDistance / 2, currentNoteTimer);
                            //把当前时值之和赋值给上一次，以便下个音符做判断
                            lastSumTimer = sumTimer;

                        } else if (sumTimer === timerPerBeat * noteJoin) {
                            //如果当前时值之和 等于 每一拍的时值*应连接的拍数（即应连接的时值之和），在左边画线
                            this.guitarNoteHooked(pickX, joinLineY, - noteDistance / 2, currentNoteTimer);

                            //该小组结束，时值之和归0
                            sumTimer = 0;
                            lastSumTimer = 0;

                        } else if (sumTimer > timerPerBeat * noteJoin) {
                            //如果当前时值之和 等于 每一拍的时值*应连接的拍数（即应连接的时值之和），则报告问题
                            console.log('guitar error timer');

                            //该小组结束，时值之和归0
                            sumTimer = 0;
                            lastSumTimer = 0;

                        } else {

                            //在小组起始和结束之间的音符
                            if (currentNoteTimer === lastNoteTimer && currentNoteTimer < nextNoteTimer) {

                                //如果 当前音符时值 等于 前面音符时值，并且 小于 后面音符时值
                                //左边按照 当前音符 绘线
                                this.guitarNoteHooked(pickX, joinLineY, - noteDistance / 2, currentNoteTimer);
                                //右边按照 后面音符 绘线
                                this.guitarNoteHooked(pickX, joinLineY, noteDistance / 2, nextNoteTimer);
                            } else if (currentNoteTimer >= lastNoteTimer && currentNoteTimer >= nextNoteTimer) {

                                //如果 当前音符时值 大于等于 前面音符时值 和 后面音符时值
                                //左右都按照 当前音符 绘线
                                this.guitarNoteHooked(pickX, joinLineY, - noteDistance / 2, currentNoteTimer);
                                this.guitarNoteHooked(pickX, joinLineY, noteDistance / 2, currentNoteTimer);

                            } else if (currentNoteTimer < lastNoteTimer && currentNoteTimer < nextNoteTimer) {

                                //如果 当前音符时值 小于 前面音符时值 和 后面音符时值
                                //左边按照 前面音符 绘线
                                this.guitarNoteHooked(pickX, joinLineY, - noteDistance / 2, lastNoteTimer);
                                //右边按照 当前音符 绘线
                                this.guitarNoteHooked(pickX, joinLineY, noteDistance / 2, currentNoteTimer);

                            } else if (currentNoteTimer < lastNoteTimer && currentNoteTimer === nextNoteTimer) {

                                //如果 当前音符时值 小于 前面音符时值，并且 等于 后面音符时值
                                //左边按照 前面音符 绘线
                                this.guitarNoteHooked(pickX, joinLineY, - noteDistance / 2, lastNoteTimer);
                                //右边按照 当前音符 绘线
                                this.guitarNoteHooked(pickX, joinLineY, noteDistance / 2, currentNoteTimer);
                            }
                        }
                    } else {
                        sumTimer = 0;
                        lastSumTimer = 0;
                    }

                    if (typeof chord === 'object') {
                        let guitarWireDistance = guitarTab.guitarWireDistance;
                        let chordGridHeight = guitarTab.chordGridHeight(chord);

                        this.chorded(chord).move(pickX - guitarWireDistance * 2/3, y - guitarWireDistance - chordGridHeight);
                    }
                }
            }
        }
    },
    construct: {
        drawGuitarBar: function (x, y, width, barData, beatPerBar, notePerBeat) {
            return this.put(new SVG.GuitarBar).guitarBar(x, y, width, barData, beatPerBar, notePerBeat);
        }
    }
});



