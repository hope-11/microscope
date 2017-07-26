/**
 * Created by houpeng on 2017/7/26.
 */
Template.postPage.helpers({
    comments: function () {
        return Comments.find({postId: this._id});
    }
});