/**
 * Created by houpeng on 2017/7/15.
 */
Meteor.publish('posts', function(){
    return Posts.find();
});