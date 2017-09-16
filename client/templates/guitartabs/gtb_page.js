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
    guitarTabs: [
        [
            [
                {picks: ['x','','','','',''], chord: chordData.em},
                {picks: ['','','x','','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','x','','','',''], chord: chordData.c},
                {picks: ['','','x','','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']}
            ],
            [
                {picks: ['x','','','','',''], chord: chordData.g},
                {picks: ['','','x','','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','4','','']},
                {picks: ['','','','','2','']},
                {picks: ['','','','','0','']},
                {picks: ['','','','','0','']}
            ],
            [
                {picks: ['x','','','','',''], chord: chordData.em},
                {picks: ['','','x','','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','x','','','',''], chord: chordData.c},
                {picks: ['','','x','','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']}
            ],
            [
                {picks: ['x','','','','',''], chord: chordData.g},
                {picks: ['','','x','','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','4','','']},
                {picks: ['','','','','2','']},
                {picks: ['','','','','0','']},
                {picks: ['','','','','0','']}
            ],
            [
                {picks: ['S','','','s','',''], noteTimer: 32, chord: chordData.em},
                //{picks: ['S','','','s','','']},
                {picks: ['','','S','','','s']},
                {picks: ['','','S','','','s'], noteTimer: 8},
                {picks: ['','','s','','','S'], noteTimer: 8},
                {picks: ['S','','','s','',''], chord: chordData.c},
                {picks: ['S','','','s','','']},
                {picks: ['','','S','','','s']},
                {picks: ['','','S','','','s'], noteTimer: 8},
                {picks: ['','','s','','','S'], noteTimer: 8}
            ],
            [
                {picks: ['S','','','s','',''], chord: chordData.g},
                {picks: ['S','','','s','','']},
                {picks: ['','','S','','','s']},
                {picks: ['','','S','','','s'], noteTimer: 8},
                {picks: ['','','s','','','S'], noteTimer: 8},
                {picks: ['S','','','s','',''], chord: chordData.d},
                {picks: ['S','','','s','','']},
                {picks: ['','','S','','','s']},
                {picks: ['','','S','','','s'], noteTimer: 8},
                {picks: ['','','s','','','S'], noteTimer: 8}
            ],
            [
                {picks: ['S','','','s','',''], chord: chordData.em},
                {picks: ['S','','','s','',''], noteTimer: 32},
                {picks: ['','','S','','','s']},
                {picks: ['','','S','','','s'], noteTimer: 32},
                {picks: ['','','s','','','S'], noteTimer: 32},
                //{picks: ['S','','','s','',''], chord: chordData.c},
                //{picks: ['S','','','s','','']},
                //{picks: ['','','S','','','s']},
                //{picks: ['','','S','','','s'], noteTimer: 8},
                //{picks: ['','','s','','','S'], noteTimer: 8}
            ],
            [
                {picks: ['S','','','s','',''], chord: chordData.g},
                {picks: ['S','','','s','','']},
                {picks: ['','','S','','','s']},
                {picks: ['','','S','','','s'], noteTimer: 8},
                {picks: ['','','s','','','S'], noteTimer: 8},
                {picks: ['S','','','s','',''], chord: chordData.d},
                {picks: ['S','','','s','','']},
                {picks: ['','','S','','','s']},
                {picks: ['','','S','','','s'], noteTimer: 8},
                {picks: ['','','s','','','S'], noteTimer: 8}
            ]
        ]
    ]
};

var gtbData3={
    title: "我想我是海",
    artist: "黄磊",
    notePerBeat: 8,     //8分音符为一拍
    beatPerBar: 6,      //每小节有6拍
    guitarTabs: [       //吉他谱谱，可能有多个吉他谱和简谱
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
        spac: 140
    };

    var guitarNum = gtbData.guitarTabs.length;

    //定义乐谱页面宽度
    var pageWidth = $('#gtb-content').width();


    //初始化击弦图形
    draw.pickSymbols = draw.initPickSymbols();

    //初始化和弦图形
    draw.chordSymbols = draw.initChordSymbols();

    //初始化简谱音符
    draw.notationSymbols = draw.initNotationSymbols();
console.log(draw.notationSymbols);
    draw.notationHead = draw.notationHead(guitarNum);

    //乐谱头部宽度
    var notationHeadWidth = draw.notationHeadWidth();
    var notationHeadHeight = draw.notationHeadHeight(guitarNum);

    //定义每一行小节数
    var numBarsInRow = 4;

    //每一小节的宽度
    var barWidth = (pageWidth - notationHeadWidth) / numBarsInRow;
    //初始化小节线
    draw.wireBarSymbol = draw.initWireBarSymbol(barWidth);

    //小节线谱绘图起点
    var barOriginX = tabParam.x0 + notationHeadWidth;

    var barOriginY = tabParam.y0;
    var beatPerBar = gtbData.beatPerBar;
    var notePerBeat = gtbData.notePerBeat;

    for (var i = 0, n = gtbData.guitarTabs.length; i < n; i++) {

        //乐谱小节数据
        var bars = gtbData.guitarTabs[i];

        for (var j = 0, m = bars.length; j < m; j++) {

            //绘制小节
            draw.drawBar(draw, barOriginX, barOriginY, barWidth, bars[j], beatPerBar, notePerBeat);

            //设定下个小节的绘图起点
            //小节起点的X坐标右移小节宽度距离
            barOriginX += barWidth;

            //如果小节起点X坐标超出页面宽度，即一行绘制完成
            if (barOriginX >= pageWidth || j === m - 1) {

                //绘制乐谱头部
                draw.use(draw.notationHead).move(tabParam.x0, barOriginY);

                //X坐标归零
                barOriginX = tabParam.x0 + notationHeadWidth;

                //Y坐标下移高度
                barOriginY = barOriginY +  notationHeadHeight + tabParam.spac;

            }

        }
    }

    for (var i = -14; i <= -8; i++){
        draw.use(draw.notation(i, 16)).move(20 * (i + 22), 220);
    }
    for (var i = -7; i <= -1; i++){
        draw.use(draw.notation(i, 12)).move(20 * (i + 22), 220);
    }
    for (var i = 0; i <= 7; i++){
        draw.use(draw.notation(i, 4)).move(20 * (i + 22), 220);
    }
    for (var i = 8; i <= 14; i++){
        draw.use(draw.notation(i, 2)).move(20 * (i + 22), 220);
    }
    for (var i = 15; i <= 21; i++){
        draw.use(draw.notation(i, 1)).move(20 * (i + 22), 220);
    }

    draw.size(pageWidth, barOriginY);
});