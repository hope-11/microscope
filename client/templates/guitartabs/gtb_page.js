/**
 * Created by Grace on 2017/8/3.
 */
//import SVG from 'meteor/houpeng:gtb';
//import { Drawing, GTS, Chord, d } from "meteor/houpeng:guitar-tab-symbols";

var chordData = {
    am: {
        name: 'Am',
        startFred: 1,
        fingers: [
            {fred: 1, pick: [2]},
            {fred: 2, pick: [4]},
            {fred: 2, pick: [3]},
            {},
            {}
        ]
    },
    em: {
        name: 'Em',
        startFred: 1,
        fingers: [
            {},
            {fred: 2, pick: [5]},
            {fred: 2, pick: [4]},
            {},
            {}
        ]
    },
    g: {
        name: 'G',
        startFred: 1,
        fingers: [
            {},
            {fred: 2, pick: [5]},
            {fred: 3, pick: [6]},
            {fred: 3, pick: [1]},
            {}
        ]
    },
    f7: {
        name: 'F7',
        startFred: 1,
        fingers: [
            {fred: 1, pick: [2]},
            {fred: 2, pick: [3]},
            {fred: 3, pick: [4]},
            {},
            {}
        ]
    },
    e: {
        name: 'E',
        startFred: 1,
        fingers: [
            {fred: 1, pick: [3]},
            {fred: 2, pick: [5]},
            {fred: 2, pick: [4]},
            {},
            {}
        ]
    },
    c: {
        name: 'C',
        startFred: 1,
        fingers: [
            {fred: 1, pick: [2]},
            {fred: 2, pick: [4]},
            {fred: 3, pick: [6]},
            {fred: 3, pick: [5]},
            {}
        ]
    },
    d: {
        name: 'D',
        startFred: 1,
        fingers: [
            {fred: 2, pick: [3]},
            {fred: 2, pick: [1]},
            {fred: 3, pick: [2]},
            {},
            {}
        ]
    },
    f: {
        name: 'F',
        startFred: 1,
        fingers: [
            {fred: 1, pick: [6, 1]},
            {fred: 2, pick: [3]},
            {fred: 3, pick: [5]},
            {fred: 3, pick: [4]},
            {}
        ]
    },
    am_5: {
        name: 'Am(5)',
        startFred: 5,
        fingers: [
            {fred: 1, pick: [3, 1]},
            {},
            {fred: 3, pick: [4]},
            {},
            {}
        ]
    },
    am_f: {
        name: 'Am/F',
        startFred: 3,
        fingers: [
            {fred: 1, pick: [4]},
            {},
            {fred: 3, pick: [3, 1]},
            {},
            {}
        ]
    },
    g_3: {
        names: 'G(3)',
        startFred: 3,
        finger: [
            {fred: 1, pick: [3, 1]},
            {fred: 2 ,pick: [3]},
            {fred: 3, pick: [4]},
            {},
            {}
        ]
    },
    b: {
        name: 'B',
        startFred: 2,
        fingers: [
            {fred: 1, pick: [6, 1]},
            {fred: 3,pick: [4]},
            {fred: 3, pick: [3]},
            {fred: 3, pick: [2]},
            {}
        ]
    },
    d_2: {
        name: 'D(2)',
        startFred: 2,
        fingers: [
            {fred: 1, pick: [6, 1]},
            {fred: 2,pick: [2]},
            {fred: 3, pick: [4]},
            {fred: 4, pick: [5]},
            {}
        ]
    }
};

var gtbData2 = {
    title: '平凡之路',
    artist: '朴树',
    notePerBeat: 4,
    beatPerBar: 4,
    bars: [

            {
                guitars: [
                    [
                        {picks: ['x','','','','',''], chord: chordData.em},
                        {picks: ['','','x','','','']},
                        {picks: ['','','','','x','']},
                        {picks: ['','','','x','','']}
                    ],
                    [
                        {picks: ['3','','','','','']},
                        {picks: ['','','0','','','']},
                        {picks: ['','','','','3','']},
                        {picks: ['','','','1','','']}
                    ]
                ],
                numNotation: [
                    {notation: 0},
                    {notation: 3, words: ['徘', '沸', '当']},
                    {notation: 3, words: ['徊', '腾', '你']},
                    {notation: 6, noteTimer: 8, words: ['着', '着', '仍']},
                    {notation: 6, noteTimer: 8, words: ['的', '的', '然']}
                ]
            },
            {
                guitars: [
                    [
                        {picks: ['','x','','','',''], chord: chordData.c},
                        {picks: ['','','x','','','']},
                        {picks: ['','','','','x','']},
                        {picks: ['','','','x','','']}
                    ],
                    [
                        {picks: ['3','','','','','']},
                        {picks: ['','','0','','','']},
                        {picks: ['','','','','3','']},
                        {picks: ['','','','1','','']}
                    ]
                ],
                numNotation: [
                    {notation: 6},
                    {notation: 1, words: ['在', '不', '还']},
                    {notation: 2, words: ['路', '安', '在']},
                    {notation: 3, noteTimer: 8, words: ['上', '着', '幻']},
                    {notation: 3, noteTimer: 8, words: ['的', '的', '想']}
                ]
            },
            {
                guitars: [
                    [
                        {picks: ['x','','','','',''], chord: chordData.g},
                        {picks: ['','','x','','','']},
                        {picks: ['','','','','x','']},
                        {picks: ['','','','x','','']}
                    ]
                ],
                numNotation: [
                    {notation: 3, noteTimer: 32},
                    {notation: 0},
                    {notation: 0}
                ]
            },
            {
                guitars: [
                    [
                        {picks: ['','','','4','','']},
                        {picks: ['','','','','2','']},
                        {picks: ['','','','','0','']},
                        {picks: ['','','','','0','']}
                    ],
                    [
                        {picks: ['3','','','','','']},
                        {picks: ['','','0','','','']},
                        {picks: ['','','','','3','']},
                        {picks: ['','','','1','','']}
                    ]
                ],
                numNotation: [
                    {notation: 0},
                    {notation: 0},
                    {notation: 0},
                    {notation: 0}
                ]
            },
            {
                guitars: [
                    [
                        {picks: ['S','','','s','',''], chord: chordData.em},
                        {picks: ['S','','','s','','']},
                        {picks: ['','','S','','','s']},
                        {picks: ['','','S','','','s'], noteTimer: 8},
                        {picks: ['','','s','','','S'], noteTimer: 8}
                    ]
                ],
                numNotation: [
                    {notation: 8, words: ['跨', '毁', '跨']},
                    {notation: 7, noteTimer: 8, words: ['过', '了', '过']},
                    {notation: 8, noteTimer: 8, words: ['山', '我', '山']},
                    {notation: 8, words: []},
                    {notation: 5, noteTimer: 8, words: ['和', '的', '和']},
                    {notation: 6, noteTimer: 8, words: ['大', '一', '大']}
                ]
            },
            {
                guitars: [
                    [
                        {picks: ['S','','','s','',''], chord: chordData.c},
                        {picks: ['S','','','s','','']},
                        {picks: ['','','S','','','s']},
                        {picks: ['','','S','','','s'], noteTimer: 8},
                        {picks: ['','','s','','','S'], noteTimer: 8}
                    ]
                ],
                numNotation: [
                    {notation: 6, noteTimer: 32, words: ['海', '切', '海']},
                    {notation: 4, words: ['也', '只', '也']},
                    {notation: 3, words: ['穿', '想', '穿']}
                ]
            },
            {
                guitars: [
                    [
                        {picks: ['S','','','s','',''], chord: chordData.g},
                        {picks: ['S','','','s','','']},
                        {picks: ['','','S','','','s']},
                        {picks: ['','','S','','','s'], noteTimer: 8},
                        {picks: ['','','s','','','S'], noteTimer: 8}
                    ]
                ],
                numNotation: [
                    {notation: 3, words: ['过', '永', '过']},
                    {notation: 3, words: ['人', '远', '人']},
                    {notation: 4, words: ['山', '的', '山']},
                    {notation: 3, words: ['人', '离', '人']}
                ]
            }

    ]
};

var gtbData3={
    title: "我想我是海",
    artist: "黄磊",
    notePerBeat: 8,     //8分音符为一拍
    beatPerBar: 6,      //每小节有6拍
    bars: [       //吉他谱谱，可能有多个吉他谱和简谱
        [
            [
                {picks: ['','x','','','',''], noteTimer: 4, chord: chordData.am},
                {picks: ['','x','','','',''], noteTimer: 4},
                {picks: ['','','x','','',''], noteTimer: 4},
                {picks: ['','','x','','',''], noteTimer: 4},
                {picks: ['','','','x','','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','',''], noteTimer: 8},
                {picks: ['','','x','','',''], noteTimer: 8},
            ],
            [
                {picks: ['','x','','','',''], chord: chordData.f7},
                {picks: ['','','x','','','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','','']}
            ],
            [
                {picks: ['','x','','','',''], chord: chordData.am},
                {picks: ['','','x','','',''], noteTimer: 8},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','',''], noteTimer: 8},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','',''], noteTimer: 8},
                {picks: ['','','x','','',''], noteTimer: 8}
            ],
            [
                {picks: ['','x','','','',''], noteTimer: 8, chord: chordData.am},
                {picks: ['','x','','','',''], noteTimer: 8},
                {picks: ['','','x','','','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','',''], noteTimer: 8},
                {picks: ['','','x','','',''], noteTimer: 8},
            ],
            [
                {picks: ['','x','','','',''], chord: chordData.f7},
                {picks: ['','','x','','','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','','']}
            ],
            [
                {picks: ['','x','','','',''], noteTimer: 8, chord: chordData.am},
                {picks: ['','','x','','',''], noteTimer: 8},
                {picks: ['','','x','','','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','',''], noteTimer: 8},
                {picks: ['','','x','','',''], noteTimer: 8}
            ],
            [
                {picks: ['','x','','','',''], noteTimer: 8, chord: chordData.am},
                {picks: ['','x','','','',''], noteTimer: 8},
                {picks: ['','','x','','','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','',''], noteTimer: 8},
                {picks: ['','','x','','',''], noteTimer: 8},
            ],
            [
                {picks: ['','x','','','',''], chord: chordData.f7},
                {picks: ['','','x','','','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','','']}
            ],
            [
                {picks: ['','x','','','',''], noteTimer: 8, chord: chordData.am},
                {picks: ['','','x','','',''], noteTimer: 8},
                {picks: ['','','x','','','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','',''], noteTimer: 8},
                {picks: ['','','S','','','s'], noteTimer: 8}
            ]

        ],
    ],
    music: {}
};

Template.gtbPage.helpers({
    gtb: gtbData2
});

Template.gtbPage.onRendered(function () {

    var gtbData = gtbData2;

    var draw = SVG('gtb-content');

    //乐谱绘制零点
    var tabParam = {
        x0: 0,
        y0: 100,
        space: 140
    };

    //var guitarNum = gtbData.bars.length;

    //定义乐谱页面宽度
    var pageWidth = $('#gtb-content').width();


    //初始化击弦图形
    draw.pickSymbols = draw.initPickSymbols();

    //初始化和弦图形
    draw.chordSymbols = draw.initChordSymbols();

    //初始化吉他谱头部图形
    draw.notationHeadSymbols = draw.initNotationHeadSymbols();

    //乐谱头部宽度
    var notationHeadWidth = draw.notationHeadSymbols[0].width;
    var notationDistance = draw.notationHeadSymbols[0].notationDistance;
    var guitarTabHeight = draw.notationHeadSymbols[0].guitarTabHeight;
    var numberedTabHeight = draw.notationHeadSymbols[0].numberedTabHeight;

    //定义每一行小节数
    var barsInRowNum = 4;

    //每一小节的宽度
    var barWidth = (pageWidth - notationHeadWidth) / barsInRowNum;
    //初始化小节线
    draw.wireBarSymbol = draw.initWireBarSymbol(barWidth);

    //每小节拍数
    var beatPerBar = gtbData.beatPerBar;
    //几分音符为一拍
    var notePerBeat = gtbData.notePerBeat;

    //谱中的小节数
    var barsInTab = gtbData.bars.length;


    //行的绘图起点坐标，默认为乐谱绘图起点坐标
    var rowX = tabParam.x0;
    var rowY = tabParam.y0;

    //按行遍历
    for (var rowSerial = 0, rowNum = Math.ceil(barsInTab / barsInRowNum); rowSerial < rowNum; rowSerial++) {

        //初始化小节内吉他数量，默认为1
        var guitarNum = 1;
        //初始化吉他序号，初始为吉他数量-1
        var guitarSerial = guitarNum - 1;
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

            //该小节吉他数量
            guitarNum = bar.guitars.length;

            if (guitarSerial < guitarNum - 1) {
                //保存吉他数量
                guitarSerial = guitarNum - 1 ;
            }
        }

        //绘制乐谱头部
        draw.use(draw.notationHeadSymbols[guitarSerial]).move(rowX, rowY);

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
            for (var j = 0; j <= guitarSerial; j++) {

                //小节内吉他谱的数据
                var guitar = bar.guitars[j];

                barY = rowY + (guitarTabHeight + notationDistance) * j;

                //绘制小节
                draw.drawGuitarBar(draw, barX, barY, barWidth, guitar, beatPerBar, notePerBeat);
            }

            var numNotation = bar.numNotation;

            barY = barY + guitarTabHeight + notationDistance;

            draw.drawNumberedBar(draw, barX, barY, barWidth, numNotation, beatPerBar, notePerBeat);

        }

        //行坐标下移
        rowY = rowY + draw.notationHeadSymbols[guitarSerial].height + tabParam.space;

    }

    /*
    for (var i = -14; i <= -8; i++){
        draw.notation(i, 8).move(20 * (i + 22), 220);
    }
    for (var i = -7; i <= -1; i++){
        draw.notation(i, 12).move(20 * (i + 22), 220);
    }
    for (var i = 0; i <= 7; i++){
        draw.notation(i, 4).move(20 * (i + 22), 220);
    }
    for (var i = 8; i <= 14; i++){
        draw.notation(i, 2).move(20 * (i + 22), 220);
    }
    for (var i = 15; i <= 21; i++){
        draw.notation(i, 1).move(20 * (i + 22), 220);
    }
    */

    draw.size(pageWidth, rowY);
});