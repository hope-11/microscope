/**
 * Created by houpeng on 2017/7/27.
 */
Notification=new Mongo.Collection('notification');

Notification.allow({
    update: function (userId, doc, fieldName) {
        return ownsDocument(userId, doc) &&
                fieldName.length===1 &&
                fieldName[0]==='read';
    }
});

createCommentNotification=function (comment) {
    var post=Posts.findOne(comment.postId);
    if(comment.userId!==post.userId){
        Notification.insert({
            userId: post.userId,
            postId:post._id,
            commentId: comment._id,
            commenterName: comment.author,
            read: false
        });
    }
};