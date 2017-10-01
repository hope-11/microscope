/**
 * Created by Grace on 2017/8/3.
 */
//import SVG from 'meteor/houpeng:gtb';
//import { Drawing, GTS, Chord, d } from "meteor/houpeng:guitar-tab-symbols";

var guitarTab = SVG.guitarTab;

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
    beatPerBar: 2,
    bars: [

            {
                guitars: [
                    [
                        {picks: ['','','x','','','x'], timer: 24, chord: chordData.em},
                        {picks: ['','','x','','',''], timer: 8},
                        {picks: ['','','','','x','']},
                        {picks: ['','','','x','','']}
                    ],
                    [
                        {picks: ['','','','P','',''], timer: 24},
                        {picks: ['','','R','','','r'], timer: 8},
                        {picks: ['','','r','','','R'], timer: 8},
                        {picks: ['','','','x','','x'], timer: 24}
                    ]
                ],
                numbereds: [
                    {note: 0},
                    {note: 3, words: ['徘', '沸', '当']},
                    {note: 3, words: ['徊', '腾', '你']},
                    {note: 6, timer: 8, words: ['着', '着', '仍']},
                    {note: 6, timer: 8, words: ['的', '的', '然']}
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
                        {picks: ['3','','','','',''], timer: 8},
                        {picks: ['','','0','','',''], timer: 24},
                        {picks: ['','','','','3','']},
                        {picks: ['','','','1','','']}
                    ]
                ],
                numbereds: [
                    {note: 6},
                    {note: 1, words: ['在', '不', '还']},
                    {note: 2, words: ['路', '安', '在']},
                    {note: 3, timer: 8, words: ['上', '着', '幻']},
                    {note: 3, timer: 8, words: ['的', '的', '想']}
                ]
            },
            {
                guitars: [
                    [
                        {picks: ['x','','','','',''], chord: chordData.g},
                        {picks: ['','','x','','','']},
                        {picks: ['','','','','x','']},
                        {picks: ['','','','x','','']}
                    ],
                    [
                        {picks: ['','','','P','',''], timer: 8},
                        {picks: ['','','R','','','r'], timer: 24},
                        {picks: ['','','r','','','R'], timer: 24},
                        {picks: ['','','','x','','x'], timer: 8}
                    ]

                ],
                numbereds: [
                    {note: 8, timer: 48},
                    //{note: 0},
                    {note: 0}
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
                numbereds: [
                    {note: 0},
                    {note: 0},
                    {note: 0},
                    {note: 0}
                ]
            },
            {
                guitars: [
                    [
                        {picks: ['S','','','s','',''], chord: chordData.em},
                        {picks: ['S','','','s','','']},
                        {picks: ['','','S','','','s']},
                        {picks: ['','','S','','','s'], timer: 8},
                        {picks: ['','','s','','','S'], timer: 8}
                    ],
                    [
                        {picks: ['','','S','','','s'], timer: 8},
                        {picks: ['','','S','','','s'], timer: 8},
                        {picks: ['','','S','','','s'], timer: 4},
                        {picks: ['','','s','','','S'], timer: 4},
                        {picks: ['','','S','','','s'], timer: 8},
                        {picks: ['','','S','','','s'], timer: 8},
                        {picks: ['','','S','','','s'], timer: 8},
                        {picks: ['','','S','','','s'], timer: 4},
                        {picks: ['','','s','','','S'], timer: 4},
                        {picks: ['','','S','','','s'], timer: 8}
                    ]
                ],
                numbereds: [
                    {note: 8, words: ['跨', '毁', '跨']},
                    {note: 7, timer: 8, words: ['过', '了', '过']},
                    {note: 8, timer: 8, words: ['山', '我', '山']},
                    {note: 8, words: []},
                    {note: 5, timer: 8, words: ['和', '的', '和']},
                    {note: 6, timer: 8, words: ['大', '一', '大']}
                ]
            },
            {
                guitars: [
                    [
                        {picks: ['S','','','s','',''], chord: chordData.c},
                        {picks: ['S','','','s','','']},
                        {picks: ['','','S','','','s']},
                        {picks: ['','','S','','','s'], timer: 8},
                        {picks: ['','','s','','','S'], timer: 8}
                    ],
                    [
                        {picks: ['','','S','','','s'], timer: 8},
                        {picks: ['','','s','','','S'], timer: 8},
                        {picks: ['','','S','','','s'], timer: 8},
                        {picks: ['','','S','','','s'], timer: 8},
                        {picks: ['','','S','','','s'], timer: 8},
                        {picks: ['','','s','','','S'], timer: 16},
                        {picks: ['','','s','','','S'], timer: 8}
                    ]
                ],
                numbereds: [
                    {note: 6, timer: 32, words: ['海', '切', '海']},
                    {note: 4, words: ['也', '只', '也']},
                    {note: 3, words: ['穿', '想', '穿']}
                ]
            },
            {
                guitars: [
                    [
                        {picks: ['S','','','s','',''], chord: chordData.g},
                        {picks: ['S','','','s','','']},
                        {picks: ['','','S','','','s']},
                        {picks: ['','','S','','','s'], timer: 8},
                        {picks: ['','','s','','','S'], timer: 8}
                    ]
                ],
                numbereds: [
                    {note: 3, words: ['过', '永', '过']},
                    {note: 3, words: ['人', '远', '人']},
                    {note: 4, words: ['山', '的', '山']},
                    {note: 3, words: ['人', '离', '人']}
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
                {picks: ['','x','','','',''], timer: 4, chord: chordData.am},
                {picks: ['','x','','','',''], timer: 4},
                {picks: ['','','x','','',''], timer: 4},
                {picks: ['','','x','','',''], timer: 4},
                {picks: ['','','','x','','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','',''], timer: 8},
                {picks: ['','','x','','',''], timer: 8},
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
                {picks: ['','','x','','',''], timer: 8},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','',''], timer: 8},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','',''], timer: 8},
                {picks: ['','','x','','',''], timer: 8}
            ],
            [
                {picks: ['','x','','','',''], timer: 8, chord: chordData.am},
                {picks: ['','x','','','',''], timer: 8},
                {picks: ['','','x','','','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','',''], timer: 8},
                {picks: ['','','x','','',''], timer: 8},
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
                {picks: ['','x','','','',''], timer: 8, chord: chordData.am},
                {picks: ['','','x','','',''], timer: 8},
                {picks: ['','','x','','','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','',''], timer: 8},
                {picks: ['','','x','','',''], timer: 8}
            ],
            [
                {picks: ['','x','','','',''], timer: 8, chord: chordData.am},
                {picks: ['','x','','','',''], timer: 8},
                {picks: ['','','x','','','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','',''], timer: 8},
                {picks: ['','','x','','',''], timer: 8},
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
                {picks: ['','x','','','',''], timer: 8, chord: chordData.am},
                {picks: ['','','x','','',''], timer: 8},
                {picks: ['','','x','','','']},
                {picks: ['','','','x','','']},
                {picks: ['','','','','x','']},
                {picks: ['','','','x','','']},
                {picks: ['','','x','','',''], timer: 8},
                {picks: ['','','S','','','s'], timer: 8}
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

    //定义乐谱页面宽度
    var pageWidth = $('#gtb-content').width();

    //定义每一行小节数
    var barsInRowNum = 6;

    var tab = draw.tabed(gtbData, pageWidth, barsInRowNum);

    draw.path('M6,-1.05L10.95,-6L12.05,-4.9L7.1,0L11.95,4.9L10.85,6L6,1.1L1.05,5.95L0.05,4.85L4.9,0L0,-4.85L1.05,-5.95L6,-1.05')
        .move(50, 50);

    draw.path('M7.5,-28.25Q8.6,-26.5 9.7,-23.7Q10.85,-20.85 10.9,-17.7Q10.7,-13.7 8.05,-10.5L3.45,-5.3Q1.95,-3.4 1.6,-1.55L1.05,1.75L0,1.75L0,-9.75L1.05,-9.75L1.05,-8.95Q2.75,-9.15 4.45,-10.15Q6.15,-11.15 7.3,-12.65Q9.4,-15.35 9.55,-18.75Q9.55,-21.65 8.65,-24.05L6.9,-28L7.5,-28.25')
        .move(60, 60);

    draw.path('M30 30L50 30M60 40L70 70').stroke('black').fill('transparent')

    draw.size(pageWidth, tab.height);
});