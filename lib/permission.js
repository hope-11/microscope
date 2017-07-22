/**
 * Created by houpeng on 2017/7/22.
 */

ownsDocument=function (userId, doc) {
    return doc && doc.userId === userId;
}