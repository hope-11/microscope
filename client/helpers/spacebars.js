/**
 * Created by Grace on 2017/7/30.
 */
UI.registerHelper('pluralize', function (n, thing) {
    if (n===1){
        return '1 ' + thing;
    }else{
        return n +' '+ thing + 's';
    }
});