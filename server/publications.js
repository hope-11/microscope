/**
 * Created by houpeng on 2017/7/15.
 */
Meteor.publish('posts', function(){
    return Posts.find();
});

Meteor.publish('comments', function (postId) {
    check(postId, String);
    return Comments.find({postId: postId});
});