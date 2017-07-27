/**
 * Created by houpeng on 2017/7/27.
 */
Template.notifications.helpers({
    notifications: function () {
        return Notifications.find({userId: Mereor.userId(), read: false});
    },
    notificationCount: function () {
        return Notifications.find({userId: Meteor.userId(), read: false}).count();
    }
});

Template.notificationItem.helpers({
    notificationPostPath: function () {
        return Router.routes.postPage.path({_id: this.postId});
    }
});

Template.notificationItem.events({
    'click a': function () {
        Notifications.update(this.id, {$set: {read: true}});
    }
})