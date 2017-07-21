/**
 * Created by Grace on 2017/7/16.
 */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function(){
        return Meteor.subscribe('posts');
    }
});

Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
    name: 'postPage',
    data: function () {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/submit', {name: 'postSubmit'});

var requireLogin=function () {
    if(! Meteor.user()){
        if(Meteor.loggingIn()){
            this.render(this.loadingTemplate);
        }
        this.render('accessDenied');
    }else{
        this.next();
    }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});