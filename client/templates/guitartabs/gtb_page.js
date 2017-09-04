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

var gtbData={
    title: "我想我是海",
    artist: "黄磊",
    beats: [
        {syllable: {picks: ['','','','','x',''], note: 2, ring: 0, ringType: ''}, chord: chordData.am},
        {syllable: {picks: ['','','','x','',''], note: 2, ring: 0, ringType: ''}},
        {syllable: {picks: ['','','x','','',''], note: 2, ring: 0, ringType: ''}},
        {syllable: {picks: ['','x','','','',''], note: 2, ring: 0, ringType: ''}},
        {syllable: {picks: ['','','x','','',''], note: 2, ring: 0, ringType: ''}},
        {syllable: {picks: ['','','','x','',''], note: 2, ring: 0, ringType: ''}},
        {syllable: {picks: ['','','','','x',''], note: 2, ring: 0, ringType: ''}, chord: chordData.f7},
        {syllable: {picks: ['','','','x','',''], note: 2, ring: 0, ringType: ''}},
        {syllable: {picks: ['','','x','','',''], note: 2, ring: 0, ringType: ''}},
        {syllable: {picks: ['','x','','','',''], note: 2, ring: 0, ringType: ''}},
        {syllable: {picks: ['','','x','','',''], note: 2, ring: 0, ringType: ''}},
        {syllable: {picks: ['','','','x','',''], note: 2, ring: 0, ringType: ''}}
    ]
};

Template.gtbPage.helpers({
    gtb: gtbData
});

Template.gtbPage.onRendered(function () {

    var draw = SVG('gtb-content').size(1000, 200);
    //draw.line(0, 100, 1000, 100).stroke({width: 1});

    draw.rect(1000, 1).move(0, 112);
    draw.rect(1000, 1).move(0, 124);
    draw.rect(1000, 1).move(0, 136);
    draw.rect(1000, 1).move(0, 148);
    draw.rect(1000, 1).move(0, 160);
    draw.rect(1000, 1).move(0, 172);

    //var am=draw.chord(chord.am);
   // var f7=draw.chord(chord.f7);
    //draw.use(chord_f7).move(210, 100);
    //draw.use(chord_f7).move(310, 100);
    //draw.use(chord_f7).move(100, 0);

    //draw.use(draw.chord(am)).move(10, 100);
    //draw.use(draw.chord(d_2)).move(110, 100);

    //音符柄
    var handled = draw.handled();
    //x击弦图形
    var pickedX = draw.pickedX();
    //拍弦图形
    var pickedSlap = draw.pickedSlap();
    //数字图形
    var pickedNums = [];
    for (var i = 0, n = 24; i < n; i++) {
        pickedNums.push(draw.pickedNum(i));
    }
    //向上扫弦图形
    var pickedSweepUps = [];
    for (var i = 0, n = 6; i < n; i++) {
        pickedSweepUps.push(draw.pickedSweepUp(i));
    }
    //向下扫弦图形
    var pickedSweepDowns = [];
    for (var i = 0, n = 6; i < n; i++) {
        pickedSweepDowns.push(draw.pickedSweepDown(i));
    }
    //向上琶音图形
    var pickedRassUps = [];
    for (var i = 0, n = 6; i < n; i++) {
        pickedRassUps.push(draw.pickedRassUp(i));
    }
    //向下琶音图形
    var pickedRassDowns = [];
    for (var i = 0, n = 6; i < n; i++) {
        pickedRassDowns.push(draw.pickedRassDown(i));
    }

    //遍历乐谱数据的弹奏数组
    for (var i = 0, bl = gtbData.beats.length; i < bl; i++){

        var beats = gtbData.beats;

        //击弦数组
        var picks = beats[i].syllable.picks;

        //击弦图形在乐谱上的x坐标
        var x = 100 + i * 20;

        //柄绘制开关
        var isHandle = false;

        //遍历击弦数组
        for (var j = 0, pl = picks.length; j < pl; j++) {
            //该击弦图形在乐谱上的y坐标
            var y = 112 + j *12;

            //如果数据不存在，则返回原值，否则去除前后空格
            var pick = typeof(picks[j]) === 'undefined' ? picks[j] : picks[j].trim();

            //如果pick值不存在，为空
            if (typeof(pick) === 'undefined' || pick === ''){
                //判断是否应该绘制柄，当已经绘制了击弦图形之后才绘制柄
                if (isHandle) {
                    //绘制柄
                    draw.use(handled).move(x, y);
                }
            } else {
                //如果pick值为'X'或'x'
                if (pick.toUpperCase() === 'X') {
                    //绘制x击弦图形
                    draw.use(pickedX).move(x, y);
                    //开启柄绘制开关
                    isHandle = true;
                    //跳出继续循环
                    continue;
                //如果pick值为数字
                } else if (!isNaN(pick)) {
                    //绘制数字图形
                    draw.use(pickedNums[pick]).move(x, y);
                    isHandle = true;
                    continue;
                //如果pick值为'P'或'p'
                } else if (pick.toUpperCase() === 'P') {
                    //绘制拍弦图形
                    draw.use(pickedSlap).move(x, y);
                    isHandle = true;
                    //调到下一根弦才开始绘制柄，否则柄会与拍弦图形交叠
                    j++;
                    continue;
                //在遍历picks数据时首先遇到的扫弦值是'S'，则说明是向上扫弦箭头
                } else if (pick === 'S') {
                    //保存当前弦位j为temp，从下一根弦开始继续遍历，寻找's'
                    for (var k = j + 1, temp = j; k < pl; k++) {
                        //如果还没找到's'，就跳到下一根弦开始绘制柄
                        j++;
                        //找到值's'，即箭头结束位置
                        if (picks[k].trim() === 's') {
                            //绘制向上扫弦箭头，跨k-temp根弦距
                            draw.use(pickedSweepDowns[k - temp]).move(x, y);
                            //开启柄绘制开关
                            isHandle = true;
                            //结束并跳出该循环
                            break;
                        }

                    }
                //在遍历picks数据时首先遇到的扫弦值是's'，则说明是向下扫弦箭头
                } else if (pick === 's') {
                    for (var k = j + 1, temp = j; k < pl; k++) {
                        j++;
                        if (picks[k].trim() === 'S') {
                            draw.use(pickedSweepUps[k - temp]).move(x, y);
                            isHandle = true;
                            break;
                        }

                    }
                //在遍历picks数据时首先遇到的扫弦值是'R'，则说明是向上琶音箭头
                } else if (pick === 'R') {
                    for (var k = j + 1, temp = j; k < pl; k++) {
                        j++;
                        if (picks[k].trim() === 'r') {
                            draw.use(pickedRassDowns[k - temp]).move(x, y);
                            isHandle = true;
                            break;
                        }

                    }
                //在遍历picks数据时首先遇到的扫弦值是'r'，则说明是向下琶音箭头
                } else if (pick === 'r') {
                    for (var k = j + 1, temp = j; k < pl; k++) {
                        j++;
                        if (picks[k].trim() === 'R') {
                            draw.use(pickedRassUps[k - temp]).move(x, y);
                            isHandle = true;
                            break;
                        }

                    }
                }

            }


            if (beats[i].chord) {
                var chord = beats[i].chord;
                console.log(chord)
                draw.use(draw.chord(chord)).move(x, 100);

            }
        }

    }

    /*
    draw.use(draw.picked(picks)).move(10, 136);
    draw.use(draw.picked('x')).move(10, 148);
    draw.use(draw.picked(0)).move(40, 136);
    draw.use(draw.picked(0)).move(40, 148);
    draw.use(draw.picked('p')).move(70, 136);
    draw.use(draw.picked('S')).move(100, 112);
    draw.use(draw.picked('s')).move(130, 112);
    draw.use(draw.picked('R')).move(160, 112);
    draw.use(draw.picked('r')).move(190, 112);
    */
    //console.log(draw.rounded(200, 100))

    //console.log(d)

    //var drawing = GTS('gtb-content');
    //console.log(drawing)
    //drawing.drawChord(am_f, 10, 149);


/*
    draw.use(new ChordSymbol(draw, d_2).draw().move(10, 149));
    draw.use(new ChordSymbol(draw, am).draw().move(100, 149));
    draw.use(new ChordSymbol(draw, g).draw().move(200, 149));
    draw.use(new ChordSymbol(draw, f7).draw().move(300, 149));
    draw.use(new ChordSymbol(draw, e).draw().move(400, 149));
    draw.use(new ChordSymbol(draw, c).draw().move(500, 149));
    draw.use(new ChordSymbol(draw, f).draw().move(600, 149));
    draw.use(new ChordSymbol(draw, am_5).draw().move(700, 149));
    draw.use(new ChordSymbol(draw, am_f).draw().move(800, 149));*/
    //draw.use(new ChordSymbol(draw, g_3).drawChordSymbol().move(10, 249));
    //draw.use(new ChordSymbol(draw, b).drawChordSymbol().move(100, 249));
    //draw.use(GTSymbol.chordSymbol.draw(draw, g_3));
    //draw.use(GTSymbol.chordSymbol.draw(draw, b).move(100, 249));
    //console.log(new ChordSymbol(draw, am_f).drawing(10, 249));
    //draw.use(GTSymbols.chordSymbol(draw, am_f).drawing(10, 249));
    //console.log(GTSymbol.chordSymbol.draw(draw, g_3))
    //drawSyllable();


});