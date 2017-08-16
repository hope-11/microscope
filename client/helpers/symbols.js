/**
 * Created by Grace on 2017/8/15.
 */


export var gtSymbol = {
    ChordSymbol: function(element, chord){
        //画板元素ID
        this.element = element;
        //所绘制和弦
        this.chord = chord;

        //弦间距
        this._pickDistance = 9;
        //品柱间距
        this._fredDistance = 16;
        //指位编号的背景圆形半径
        this._fingerCircleRadius = 6;
        //弦数量
        this._pickNumber = 6;
        //绘图线宽
        this._lineWidth = 1;

        //手指符号文字
        this._fingerTextFont = {
            size: 12,                   //文字尺寸
            weight: 'bold',             //粗体
            anchor: 'middle'            //居中
        };
        //和弦名称文字
        this._nameTextFont = {
            size: 16,                   //文字尺寸
            anchor: 'middle'            //居中
        }
    }
};
gtSymbol.ChordSymbol.prototype = {
    _getGridWidth: function(){
        return this._pickDistance * (this._pickNumber - 1) + this._lineWidth;
    },
    _getGridHeight: function() {
        return this._fredDistance * this._getFredNumber();
    },
    _getFredNumber: function(){
        var num = 3;    //默认3个品格
        //遍历和弦指位元素，有品位超过3的，则取代
        for(var i = 0; i < this.chord.finger.length; i++){
            var fred = this.chord.finger[i].fred;
            if(fred > num){
                num = fred;
            }
        }
        return num;
    },
    _getNameTextPosition: function () {
        var x = this._getGridOrigin().x + this._getGridWidth() / 2;
        var y = 0;
        return {x: x, y: y};
    },
    _getGridOrigin: function(){
        var x = this._nameTextFont.size;
        var y = this._nameTextFont.size;
        return {x: x, y: y};
    },
    _getFingerCirclePosition: function(fred, pick){
        //指位编号所在弦的位置坐标，即X轴坐标，（弦总数 - 弦号） * 弦距 - 指圆半径
        var x = this._getGridOrigin().x + (this._pickNumber - pick) * this._pickDistance - this._fingerCircleRadius;
        //指位编号所在品格的位置坐标，即Y轴坐标，（品位号 * 品距） - 半个品距 - 指圆半径
        var y = this._getGridOrigin().y + fred * this._fredDistance - this._fredDistance / 2 - this._fingerCircleRadius;
        return {x: x, y: y};

    },
    drawChordSymbol: function(){
        //创建symbol
        var symbol = this.element.symbol();

        var chord = this.chord;

        var pickDistance = this._pickDistance;
        var fredDistance = this._fredDistance;
        var fingerCircleRadius = this._fingerCircleRadius;
        var pickNumber = this._pickNumber;
        var lineWidth = this._lineWidth;
        var fingerTextFont = this._fingerTextFont;
        var nameTextFont = this._nameTextFont;

        var gridWidth = this._getGridWidth();
        var gridHeight = this._getGridHeight();
        var fredNumber = this._getFredNumber();
        var nameTextPosition = this._getNameTextPosition();
        var gridOrigin = this._getGridOrigin();

        //绘制和弦名称
        symbol.text(chord.name)
            .font(nameTextFont)
            .move(nameTextPosition.x, nameTextPosition.y);

        //绘制弦
        for (var i = 0; i < pickNumber; i++) {
            symbol.rect(lineWidth, gridHeight)
                .move(gridOrigin.x + pickDistance * i, gridOrigin.y);
        }
        //绘制品柱
        for ( var i = 0; i < fredNumber + 1; i++) {
            symbol.rect(gridWidth, lineWidth)
                .move(gridOrigin.x, gridOrigin.y +  fredDistance * i);
        }

        //绘制指位
        for(var i = 0; i < pickNumber; i++){
            //和弦中的手指
            var finger = chord.finger[i];
            //判断手指是否为空对象，如果是空对象，不执行
            if(!$.isEmptyObject(finger)){
                //指位坐标
                var fingerCirclePosition = this._getFingerCirclePosition(finger.fred, finger.pick[0]);

                //只有起始品位存在并且不为1时才标记，起始品位，否则不需标记
                if(chord.startFred && chord.startFred !== 1){
                    //绘制起始品位
                    symbol.text(chord.startFred + '')
                        .font(fingerTextFont)
                        .fill('#000')
                        .move(gridOrigin.x - pickDistance / 2, gridOrigin.y + fredDistance / 2 - fingerTextFont.size / 2);
                }

                //如果pick数组长度为2，则为横按
                if(finger.pick[1]){
                    //横按起始弦位
                    var xFingerStart = fingerCirclePosition.x + fingerCircleRadius * 5 / 4;
                    //横按结束弦位，一般为1弦
                    var xFingerEnd = this._getFingerCirclePosition(finger.fred, finger.pick[1]).x + fingerCircleRadius;

                    var yFinger = fingerCirclePosition.y + fingerCircleRadius;
                    //绘制横按图形，两端为圆的线，宽度为指圆半径的1/2
                    symbol.line(xFingerStart, yFinger, xFingerEnd, yFinger)
                        .stroke({width: fingerCircleRadius, linecap: 'round'});
                    //绘制手指数字，在和弦图形相应品位的右侧
                    symbol.text(i + 1 + '')
                        .font(fingerTextFont)
                        .fill('#000')
                        .move(xFingerEnd + fingerCircleRadius, fingerCirclePosition.y);
                }else {
                    //绘制指圆图形
                    symbol.circle(fingerCircleRadius * 2)
                        .move(fingerCirclePosition.x, fingerCirclePosition.y);
                    symbol.text(i + 1 + '')
                        .font(fingerTextFont)
                        .fill('#fff')
                        .move(fingerCirclePosition.x + fingerCircleRadius, fingerCirclePosition.y);
                }
            }
        }

        return symbol;
    }
};


/*
export var ChordSymbol = function(element, chord){
    //画板元素ID
    this.element = element;
    //所绘制和弦
    this.chord = chord;

    //弦间距
    this._pickDistance = 9;
    //品柱间距
    this._fredDistance = 16;
    //指位编号的背景圆形半径
    this._fingerCircleRadius = 6;
    //弦数量
    this._pickNumber = 6;
    //绘图线宽
    this._lineWidth = 1;

    //手指符号文字
    this._fingerTextFont = {
        size: 12,                   //文字尺寸
        weight: 'bold',             //粗体
        anchor: 'middle'            //居中
    };
    //和弦名称文字
    this._nameTextFont = {
        size: 16,                   //文字尺寸
        anchor: 'middle'            //居中
    }
};
ChordSymbol.prototype._getGridWidth = function(){
    return this._pickDistance * (this._pickNumber - 1) + this._lineWidth;
};
ChordSymbol.prototype._getGridHeight = function() {
    return this._fredDistance * this._getFredNumber();
};
ChordSymbol.prototype._getFredNumber = function(){
    var num = 3;    //默认3个品格
    //遍历和弦指位元素，有品位超过3的，则取代
    for(var i = 0; i < this.chord.finger.length; i++){
        var fred = this.chord.finger[i].fred;
        if(fred > num){
            num = fred;
        }
    }
    return num;
};
ChordSymbol.prototype._getNameTextPosition = function () {
    var x = this._getGridOrigin().x + this._getGridWidth() / 2;
    var y = 0;
    return {x: x, y: y};
};
ChordSymbol.prototype._getGridOrigin = function(){
    var x = this._nameTextFont.size;
    var y = this._nameTextFont.size;
    return {x: x, y: y};
};
ChordSymbol.prototype._getFingerCirclePosition = function(fred, pick){
    //指位编号所在弦的位置坐标，即X轴坐标，（弦总数 - 弦号） * 弦距 - 指圆半径
    var x = this._getGridOrigin().x + (this._pickNumber - pick) * this._pickDistance - this._fingerCircleRadius;
    //指位编号所在品格的位置坐标，即Y轴坐标，（品位号 * 品距） - 半个品距 - 指圆半径
    var y = this._getGridOrigin().y + fred * this._fredDistance - this._fredDistance / 2 - this._fingerCircleRadius;
    return {x: x, y: y};

};
ChordSymbol.prototype.drawChordSymbol = function(){
    //创建symbol
    var symbol = this.element.symbol();

    var chord = this.chord;

    var pickDistance = this._pickDistance;
    var fredDistance = this._fredDistance;
    var fingerCircleRadius = this._fingerCircleRadius;
    var pickNumber = this._pickNumber;
    var lineWidth = this._lineWidth;
    var fingerTextFont = this._fingerTextFont;
    var nameTextFont = this._nameTextFont;

    var gridWidth = this._getGridWidth();
    var gridHeight = this._getGridHeight();
    var fredNumber = this._getFredNumber();
    var nameTextPosition = this._getNameTextPosition();
    var gridOrigin = this._getGridOrigin();

    //绘制和弦名称
    symbol.text(chord.name)
        .font(nameTextFont)
        .move(nameTextPosition.x, nameTextPosition.y);

    //绘制弦
    for (var i = 0; i < pickNumber; i++) {
        symbol.rect(lineWidth, gridHeight)
            .move(gridOrigin.x + pickDistance * i, gridOrigin.y);
    }
    //绘制品柱
    for ( var i = 0; i < fredNumber + 1; i++) {
        symbol.rect(gridWidth, lineWidth)
            .move(gridOrigin.x, gridOrigin.y +  fredDistance * i);
    }

    //绘制指位
    for(var i = 0; i < pickNumber; i++){
        //和弦中的手指
        var finger = chord.finger[i];
        //判断手指是否为空对象，如果是空对象，不执行
        if(!$.isEmptyObject(finger)){
            //指位坐标
            var fingerCirclePosition = this._getFingerCirclePosition(finger.fred, finger.pick[0]);

            //只有起始品位存在并且不为1时才标记，起始品位，否则不需标记
            if(chord.startFred && chord.startFred !== 1){
                //绘制起始品位
                symbol.text(chord.startFred + '')
                    .font(fingerTextFont)
                    .fill('#000')
                    .move(gridOrigin.x - pickDistance / 2, gridOrigin.y + fredDistance / 2 - fingerTextFont.size / 2);
            }

            //如果pick数组长度为2，则为横按
            if(finger.pick[1]){
                //横按起始弦位
                var xFingerStart = fingerCirclePosition.x + fingerCircleRadius * 5 / 4;
                //横按结束弦位，一般为1弦
                var xFingerEnd = this._getFingerCirclePosition(finger.fred, finger.pick[1]).x + fingerCircleRadius;

                var yFinger = fingerCirclePosition.y + fingerCircleRadius;
                //绘制横按图形，两端为圆的线，宽度为指圆半径的1/2
                symbol.line(xFingerStart, yFinger, xFingerEnd, yFinger)
                    .stroke({width: fingerCircleRadius, linecap: 'round'});
                //绘制手指数字，在和弦图形相应品位的右侧
                symbol.text(i + 1 + '')
                    .font(fingerTextFont)
                    .fill('#000')
                    .move(xFingerEnd + fingerCircleRadius, fingerCirclePosition.y);
            }else {
                //绘制指圆图形
                symbol.circle(fingerCircleRadius * 2)
                    .move(fingerCirclePosition.x, fingerCirclePosition.y);
                symbol.text(i + 1 + '')
                    .font(fingerTextFont)
                    .fill('#fff')
                    .move(fingerCirclePosition.x + fingerCircleRadius, fingerCirclePosition.y);
            }
        }
    }

    return symbol;
};
*/