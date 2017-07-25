/**
 * Created by houpeng on 2017/7/25.
 */
Template.errors.helpers({
    errors: function () {
        return Errors.find();
    }
});

Template.error.onRendered(function(){
    var error=this.data;
    Meteor.setTimeout(function(){
        Errors.remove(error._id);
    }, 3000);
});