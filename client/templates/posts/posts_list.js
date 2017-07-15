/**
 * Created by houpeng on 2017/7/15.
 */
Template.postsList.helpers({
    posts: function(){
        return Posts.find();
    }
});