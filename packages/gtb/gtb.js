// Write your package code here!
//import 'svg.js';
// Variables exported by this module can be imported by other packages and
// applications. See gtb-tests.js for an example of importing.
export const name = 'gtb';

SVG = require('svg.js');

SVG.Chord = SVG.invent({
    create: 'rect',
    inherit: SVG.Shape,
    extend: {
        //弦间距
        pickDistance: 9,
        //品柱间距
        fredDistance: 16,
        //指位编号的背景圆形半径
        fingerCircleRadius: 6,
        //弦数量
        tpickNumber: 6,
        //绘图线宽
        lineWidth: 1,

        //手指符号文字
        fingerTextFont: {
            size: 12,                   //文字尺寸
            weight: 'bold',             //粗体
            anchor: 'middle'            //居中
        },
        //和弦名称文字
        nameTextFont: {
            size: 16,                   //文字尺寸
            anchor: 'middle'            //居中
        }



    },
    construct: {
        chord: function (chord) {
            return this.put(new SVG.Chord).pickDistance;
        }
    }

});
