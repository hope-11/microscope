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

var gtbData={
    title: "我想我是海",
    artist: "黄磊",
    beats: []

};

var drawChord=function (element, chord, x0, y0, scale) {

    var draw = SVG(element);

    //默认参数，左下角为(0, 0)
    var paramDefault={
        x0: 0,          //图形的绘制起点X轴坐标
        y0: 0,          //图形的绘制起点Y轴坐标
        disPick: 9,       //弦间距
        disFred: 19,      //品柱间距
        rFinger: 6,     //指位编号的背景圆形半径
        numPick: 6,      //弦数量
        widthLine: 1,    //绘图线宽
        sizeFingerText: 10    //文字尺寸
    };

    var param={
        x0: x0 ? x0 : paramDefault.x0,
        y0: y0 ? y0 : paramDefault.y0,
        disPick: scale ? scale * paramDefault.disPick : paramDefault.disPick,
        disFred: scale ? scale * paramDefault.disFred : paramDefault.disFred,
        rFinger: scale ? scale * paramDefault.rFinger : paramDefault.rFinger,
        sizeFingerText: scale ? scale * paramDefault.sizeFingerText : paramDefault.sizeFingerText,

        //品格数量
        numFred: function () {
            return 3;
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
                - Math.floor(this.disFred / 2) + 1        //向上偏移半个品格间距
                + fred * this.disFred;                     //向下偏移品位*品距

            return {x: x, y: y};
        }
    };

    //创建symbol
    var symbol = draw.symbol();
    //绘制弦
    for (i = 0; i < 6; i++) {
        symbol.rect(paramDefault.widthLine, param.height())
            .move(param.x0 + i * param.disPick, param.y0-param.height());
    }
    //绘制品柱
    for (i = 0; i < 4; i++) {
        symbol.rect(param.width(), paramDefault.widthLine)
            .move(param.x0, param.y0-i * param.disFred);
    }

    //绘制指位
    for(i=0; i<paramDefault.numPick; i++){
        //和弦中的手指
        var finger = chord.finger[i];
        //判断手指是否为空对象，如果是空对象，不执行
        if(!$.isEmptyObject(finger)){
            //指位坐标
            var posFinger=param.posFinger(finger.fred, finger.pick);
            //绘制指圆图形
            symbol.circle(param.rFinger * 2)
                .move(posFinger.x, posFinger.y);
            symbol.text(i + 1 +  '')
                .font({size: param.sizeFingerText, anchor: 'middle'})
                .fill('#fff')
                .move(posFinger.x + param.rFinger, posFinger.y);
        }
    }

    draw.use(symbol);
};

Template.gtbPage.helpers({
    gtb: gtbData
});

Template.gtbPage.onRendered(function () {
    drawChord('gtb-content', am, 100, 149,2);


});