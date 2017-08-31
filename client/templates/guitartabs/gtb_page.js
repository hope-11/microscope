/**
 * Created by Grace on 2017/8/3.
 */
//import SVG from 'meteor/houpeng:gtb';
//import { Drawing, GTS, Chord, d } from "meteor/houpeng:guitar-tab-symbols";


var am={
    name: 'Am',
    startFred: 1,
    fingers: [
        {fred: 1, pick: [2]},
        {fred: 2, pick: [4]},
        {fred: 2, pick: [3]},
        {},
        {}
    ]
};

var g={
    name: 'G',
    startFred: 1,
    fingers: [
        {},
        {fred: 2, pick: [5]},
        {fred: 3, pick: [6]},
        {fred: 3, pick: [1]},
        {}
    ]
};

var f7={
    name: 'F7',
    startFred: 1,
    fingers: [
        {fred: 1, pick: [2]},
        {fred: 2, pick: [3]},
        {fred: 3, pick: [4]},
        {},
        {}
    ]
};
var e={
    name: 'E',
    startFred: 1,
    fingers: [
        {fred: 1, pick: [3]},
        {fred: 2, pick: [5]},
        {fred: 2, pick: [4]},
        {},
        {}
    ]
};
var c={
    name: 'C',
    startFred: 1,
    fingers: [
        {fred: 1, pick: [2]},
        {fred: 2, pick: [4]},
        {fred: 3, pick: [6]},
        {fred: 3, pick: [5]},
        {}
    ]
};
var f={
    name: 'F',
    startFred: 1,
    fingers: [
        {fred: 1, pick: [6, 1]},
        {fred: 2, pick: [3]},
        {fred: 3, pick: [5]},
        {fred: 3, pick: [4]},
        {}
    ]
};
var am_5={
    name: 'Am(5)',
    startFred: 5,
    fingers: [
        {fred: 1, pick: [3, 1]},
        {},
        {fred: 3, pick: [4]},
        {},
        {}
    ]
};
var am_f={
    name: 'Am/F',
    startFred: 3,
    fingers: [
        {fred: 1, pick: [4]},
        {},
        {fred: 3, pick: [3, 1]},
        {},
        {}
    ]
};
var g_3={
    names: 'G(3)',
    startFred: 3,
    finger: [
        {fred: 1, pick: [3, 1]},
        {fred: 2 ,pick: [3]},
        {fred: 3, pick: [4]},
        {},
        {}
    ]
};
var b={
    name: 'B',
    startFred: 2,
    fingers: [
        {fred: 1, pick: [6, 1]},
        {fred: 3,pick: [4]},
        {fred: 3, pick: [3]},
        {fred: 3, pick: [2]},
        {}
    ]
};
var d_2={
    name: 'D(2)',
    startFred: 2,
    fingers: [
        {fred: 1, pick: [6, 1]},
        {fred: 2,pick: [2]},
        {fred: 3, pick: [4]},
        {fred: 4, pick: [5]},
        {}
    ]
};


var gtbData={
    title: "我想我是海",
    artist: "黄磊",
    beats: [
        {
            syllable: {
                pick: ['','1','2','3','4','5'],
                note: 2,
                ring: 0,
                ringType: ''
            },
            chrod: am
        },
        {
            syllable: {
                pick: ['0','1','2','3','4','5'],
                note: 2,
                ring: 0,
                ringType: ''
            },
            chrod: am
        },
        {
            syllable: {
                pick: ['0','1','2','3','4','5'],
                note: 2,
                ring: 0,
                ringType: ''
            },
            chrod: am
        },
        {
            syllable: {
                pick: ['0','1','2','3','4','5'],
                note: 2,
                ring: 0,
                ringType: ''
            },
            chrod: am
        },
        {
            syllable: {
                pick: ['0','1','2','3','4','5'],
                note: 2,
                ring: 0,
                ringType: ''
            },
            chrod: am
        }
    ]
};

var symbols={
    x: function (draw, x, y, scale) {
        var symbol = draw.symbol();

        var len = scale ? scale * 5 : 5;
        var widthLine = scale ? scale * 1 : 1;

        symbol.line(x, y, x + len, y + len).stroke({width: widthLine});
        symbol.line(x, y, x + len, y - len).stroke({width: widthLine});
        symbol.line(x, y, x - len, y + len).stroke({width: widthLine});
        symbol.line(x, y, x - len, y - len).stroke({width: widthLine});

        return symbol;
    },
    num: function (draw, x, y, num, sizeNum, scale) {
        var symbol = draw.symbol();

        var sizeText = scale ? scale * (sizeNum ? sizeNum : 16) : (sizeNum ? sizeNum : 16);

        symbol.text(num + '')
            .font({size: sizeText, anchor: 'middle'})
            .fill('#000')
            .move(x, y - sizeText / 2 );

        return symbol;
    },
    sweep: function (draw, x, yStart, yEnd, scale) {
        var symbol = draw.symbol();

        symbol.polyline([x, yStart], [x, yEnd])
            .fill("none")
            .stroke({ color: '#000', width: 1});

        return symbol;

    }
};

var drawSyllable=function () {
    var draw=SVG('gtb-content');

    var paramDefault={
        x0: 50,
        y0: 50,
        disPick: 12,
        disNote:20,
        widthLine: 1,
        sizeText: 16
    }


draw.use(symbols.x(draw, 70, 50));
draw.use(symbols.num(draw, 100, 50, 0));
draw.use(symbols.sweep(draw, 130, 80, 50));

    draw.rect(paramDefault.widthLine, 46).move(paramDefault.x0, paramDefault.y0);

    for(var i=0; i<6; i++){
        draw.rect(100, paramDefault.widthLine).move(paramDefault.x0, paramDefault.y0+i*paramDefault.disPick);
    }

    for(var i=0; i<gtbData.beats.length; i++){
        for(var j=0; j<6; j++){
            if(gtbData.beats[0].syllable.pick[j]){
                var text=draw.text('aaa');
                    text.tspan(gtbData.beats[0].syllable.pick[j]).dy(paramDefault.sizeText/2)
                    .font({size: paramDefault.sizeText, anchor: 'middle'})
                    .move(paramDefault.x0+i*paramDefault.disNote, paramDefault.y0+j*paramDefault.disPick);
            }
        }
    }

}

Template.gtbPage.helpers({
    gtb: gtbData
});

Template.gtbPage.onRendered(function () {
    //var draw = new Drawing('gtb-content').size(1000, 400);
    //var drawing = GTSymbols.drawing('gtb-content').size(1000, 400);
    //drawing.use(GTSymbols.chordSymbol(am_f).draw(10, 249));

    var draw = SVG('gtb-content');
    //draw.line(0, 100, 1000, 100).stroke({width: 1});
    draw.rect(1000, 1).move(0, 100);
    draw.rect(1000, 1).move(0, 112);
    draw.rect(1000, 1).move(0, 124);
    //draw.rect(100, 100);

    var chord_f7=draw.chord(f7);
    draw.use(chord_f7).move(210, 100);
    draw.use(chord_f7).move(310, 100);
    //draw.use(chord_f7).move(100, 0);

    draw.use(draw.chord(am)).move(10, 100);
    draw.use(draw.chord(d_2)).move(110, 100);

    draw.use(draw.picked('x')).move(10, 112);
    draw.use(draw.picked(1)).move(30, 112);
    draw.use(draw.picked(12)).move(30, 124);
    draw.use(draw.picked('o')).move(50, 112);
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