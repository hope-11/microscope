/**
 * Created by houpeng on 2017/7/25.
 */
Errors=new Mongo.Collection(null);

throwError=function (message) {
    Errors.insert({message: message});
};

