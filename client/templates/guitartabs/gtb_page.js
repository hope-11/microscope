/**
 * Created by Grace on 2017/8/3.
 */
import { Svgjs } from 'svg.js';

var am={
    name: 'Am',
    startFred: 1,
    finger: [
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
    finger: [
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
    finger: [
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
    finger: [
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
    finger: [
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
    finger: [
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
    finger: [
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
    finger: [
        {fred: 1, pick: [4]},
        {},
        {fred: 3, pick: [3, 1]},
        {},
        {}
    ]
};
var g_3={
    name: 'G(3)',
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
    finger: [
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
    finger: [
        {fred: 1, pick: [6, 1]},
        {fred: 2,pick: [2]},
        {fred: 3, pick: [4]},
        {fred: 4, pick: [5]},
        {}
    ]
};


var drawChord=function (draw, chord, x0, y0, scale) {

    //在element上创建图形
    //var draw = SVG(element);

    //默认参数，左下角为(0, 0)
    var paramDefault={
        x0: 0,          //图形的绘制起点X轴坐标
        y0: 0,          //图形的绘制起点Y轴坐标
        disPick: 9,       //弦间距
        disFred: 16,      //品柱间距
        rFinger: 6,     //指位编号的背景圆形半径
        numPick: 6,      //弦数量
        widthLine: 1,    //绘图线宽
        sizeFingerText: 10,    //文字尺寸
        sizeNameText: 16    //和弦名称文字尺寸
    };

    var param={
        x0: x0 ? x0 : paramDefault.x0,
        y0: y0 ? y0 : paramDefault.y0,
        disPick: scale ? scale * paramDefault.disPick : paramDefault.disPick,
        disFred: scale ? scale * paramDefault.disFred : paramDefault.disFred,
        rFinger: scale ? scale * paramDefault.rFinger : paramDefault.rFinger,
        sizeFingerText: scale ? scale * paramDefault.sizeFingerText : paramDefault.sizeFingerText,
        sizeNameText: scale ? scale * paramDefault.sizeNameText : paramDefault.sizeNameText,

        //品格数量
        numFred: function () {
            var num = 3;
            for(var i=0; i<chord.finger.length; i++){
                var fred=chord.finger[i].fred;
                if(fred > num){
                    num = fred;
                }
            }
            return num;
        },
        //图形宽度
        width: function () {
            return this.disPick * (paramDefault.numPick - 1) + paramDefault.widthLine;
        },
        //图形高度
        height: function () {
            return this.disFred * this.numFred();
        },
        //指位编号的位置坐标，fred-品，pick-弦
        posFinger: function (fred, pick) {
            //指位编号所在弦的位置坐标，即X轴坐标
            var x=this.x0 - this.rFinger + (paramDefault.numPick - pick) * this.disPick;
            //指位编号所在品格的位置坐标，即Y轴坐标
            var y=this.y0 - this.height()                 //定位图形上端为0点
                - this.rFinger                             //向上偏移指圆半径
                - this.disFred / 2       //向上偏移半个品格间距
                + fred * this.disFred;                     //向下偏移品位*品距

            return {x: x, y: y};
        }
    };

    //创建symbol
    var symbol = draw.symbol();
    //绘制弦
    for (i = 0; i < paramDefault.numPick; i++) {
        symbol.rect(paramDefault.widthLine, param.height())
            .move(param.x0 + i * param.disPick, param.y0-param.height());
    }
    //绘制品柱
    for (i = 0; i < param.numFred() + 1; i++) {
        symbol.rect(param.width(), paramDefault.widthLine)
            .move(param.x0, param.y0-i * param.disFred);
    }

    //绘制指位
    for(i = 0; i < paramDefault.numPick; i++){
        //和弦中的手指
        var finger = chord.finger[i];
        //判断手指是否为空对象，如果是空对象，不执行
        if(!$.isEmptyObject(finger)){
            //指位坐标
            var posFinger = param.posFinger(finger.fred, finger.pick[0]);

            //只有起始品位存在并且不为1时才标记，起始品位，否则不需标记
            if(chord.startFred && chord.startFred != 1){
                //绘制起始品位
                symbol.text(chord.startFred + '')
                    .font({size: param.sizeFingerText})
                    .fill('#000')
                    .move(param.x0 - param.disPick , param.y0 - param.height() - param.sizeFingerText / 2 + param.disFred / 2);
            }

            //如果pick数组长度为2，则为横按
            if(finger.pick[1]){
                //横按起始弦位
                var xFingerStart = posFinger.x + param.rFinger *5 / 4;
                //横按结束弦位，一般为1弦
                var xFingerEnd = param.posFinger(finger.fred, finger.pick[1]).x + param.rFinger ;
                var yFinger = posFinger.y + param.rFinger;
                //绘制横按图形，两端为圆的线，宽度为指圆半径的1/2
                symbol.line(xFingerStart, yFinger, xFingerEnd, yFinger)
                    .stroke({width: param.rFinger, linecap: 'round'});
                //绘制手指数字，在和弦图形相应品味的右侧
                symbol.text(i + 1 + '')
                    .font({size: param.sizeFingerText, anchor: 'middle'})
                    .fill('#000')
                    .move(xFingerEnd + param.rFinger, posFinger.y);
            }else {
                //绘制指圆图形
                symbol.circle(param.rFinger * 2)
                    .move(posFinger.x, posFinger.y);
                symbol.text(i + 1 + '')
                    .font({size: param.sizeFingerText, anchor: 'middle'})
                    .fill('#fff')
                    .move(posFinger.x + param.rFinger, posFinger.y);
            }
        }
    }

    //绘制和弦名称
    symbol.text(chord.name)
        .font({size: param.sizeNameText, anchor: 'middle'})
        .move(param.x0 + param.width() / 2, param.y0 - param.height() - param.sizeNameText -1);

    draw.use(symbol);
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

        var len = scale ? scale * 3 : 3;
        var widthLine = scale ? scale * 1 : 1;

        symbol.line(x, y, x + len, y + len).stroke({width: widthLine});
        symbol.line(x, y, x + len, y - len).stroke({width: widthLine});
        symbol.line(x, y, x - len, y + len).stroke({width: widthLine});
        symbol.line(x, y, x - len, y - len).stroke({width: widthLine});

        return symbol;
    },
    num: function (draw, x, y, num, sizeNum, scale) {
        var symbol = draw.symbol();

        var sizeText = scale ? scale * (sizeNum ? sizeNum : 10) : (sizeNum ? sizeNum : 10);

        symbol.text(num + '')
            .font({size: sizeText, anchor: 'middle'})
            .fill('#000')
            .move(x, y - sizeText / 2 -1);

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
        disPick: 9,
        disNote:16,
        widthLine: 1,
        sizeText: 10
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
    var draw=SVG('gtb-content');
    drawChord(draw, d_2, 10, 149);
    drawChord(draw, am, 100, 149);
    drawChord(draw, g, 200, 149);
    drawChord(draw, f7, 300, 149);
    drawChord(draw, e, 400, 149);
    drawChord(draw, c, 500, 149);
    drawChord(draw, f, 600, 149);
    drawChord(draw, am_5, 700, 149);
    drawChord(draw, am_f, 800, 149);
    drawChord(draw, g_3, 900, 149);
    drawChord(draw, b, 1000, 149);

    drawSyllable();
});