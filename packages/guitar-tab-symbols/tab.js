/**
 * Created by houpeng on 2017/10/1.
 */

SVG = require('svg.js');

let guitarTab = require('./parameters.js').guitarTab;

SVG.guitarTab = guitarTab;

SVG.Tab = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        tab: function(gtbData, pageWidth, barsInRowNum) {
            //乐谱头部宽度
            var notationHeadWidth = guitarTab.notationHeadWidth();
            //谱间距，吉他谱与吉他谱，吉他谱与简谱
            var notationDistance = guitarTab.notationDistance();
            //吉他谱高度
            var guitarTabHeight = guitarTab.guitarNotationHeight();
            //简谱高度
            var numberedTabHeight = guitarTab.numberedNotationHeight();
            //和弦高度
            var chordHeight = guitarTab.chordHeight();

            //每一小节的宽度
            var barWidth = (pageWidth - notationHeadWidth) / barsInRowNum;

            //每小节拍数
            var beatPerBar = gtbData.beatPerBar;
            //几分音符为一拍
            var notePerBeat = gtbData.notePerBeat;

            //谱中的小节数
            var barsInTab = gtbData.bars.length;

            //行的绘图起点坐标，默认为乐谱绘图起点坐标
            var rowX = 0;
            var rowY = chordHeight;
            //行间距
            var rowSpace = chordHeight + numberedTabHeight;

            //按行遍历
            for (var rowSerial = 0, rowNum = Math.ceil(barsInTab / barsInRowNum); rowSerial < rowNum; rowSerial++) {

                //初始化小节内吉他数量，默认为1
                var guitarNum = 1;
                //初始化歌词行数，默认为1
                var wordsRowNum = 1;

                //当前行的小节数，默认为定义的每行小节数
                var barsInCurrentRowNum = barsInRowNum;

                //如果是最后一行，当前行的小节数为 总小节数 对 每行小节数 取余
                if (rowSerial === rowNum - 1) {
                    barsInCurrentRowNum = barsInTab % barsInRowNum;
                }

                //遍历一行内的小节，把最大数量的吉他数-1保存到吉他序号
                for (var i = 0; i < barsInCurrentRowNum; i++) {

                    //小节序号
                    var barSerial = rowSerial * barsInRowNum + i;

                    //乐谱小节
                    var bar = gtbData.bars[barSerial];

                    if (guitarNum < bar.guitars.length) {
                        //保存吉他数量
                        guitarNum = bar.guitars.length;
                    }

                    //遍历简谱数据
                    for (var j = 0, m = bar.numbereds.length; j < m; j++) {

                        //当前音符的歌词段落数
                        var currentWordsRowNum = typeof bar.numbereds[j].words === 'undefined' ? wordsRowNum : bar.numbereds[j].words.length;

                        //取最大的音符歌词段落数
                        if (wordsRowNum < currentWordsRowNum) {
                            wordsRowNum = currentWordsRowNum;
                        }
                    }
                    //根据歌词段落数计算行间距
                    rowSpace = chordHeight + numberedTabHeight * wordsRowNum;

                }

                //绘制乐谱头部
                this.notationHead(guitarNum).move(rowX, rowY);

                //遍历一行内的小节，绘制该行所有小节
                for (var i = 0; i < barsInCurrentRowNum; i++) {

                    //小节序号
                    var barSerial = rowSerial * barsInRowNum + i;

                    //乐谱小节
                    var bar = gtbData.bars[barSerial];

                    //小节每一把吉他的绘图起点坐标
                    var barX = rowX + notationHeadWidth + barWidth * i;
                    var barY = rowY;

                    //按照该行最大吉他数量绘制小节
                    for (var j = 0; j < guitarNum; j++) {

                        //小节内吉他谱的数据
                        var guitar = bar.guitars[j];

                        barY = rowY + (guitarTabHeight + notationDistance) * j;

                        //绘制小节
                        this.drawGuitarBar(barX, barY, barWidth, guitar, beatPerBar, notePerBeat);
                    }

                    var numbereds = bar.numbereds;

                    barY = barY + guitarTabHeight + notationDistance;

                    this.drawNumberedBar(barX, barY, barWidth, numbereds, beatPerBar, notePerBeat);

                }

                //行坐标下移
                rowY = rowY + guitarTab.notationHeadHeight(guitarNum) + rowSpace;

            }
            this.height = rowY;

            return this;
        }
    },
    construct: {
        tabed: function (gtbData, pageWidth, barsInRowNum) {
            return this.put(new SVG.Tab).tab(gtbData, pageWidth, barsInRowNum);
        }
    }
});
