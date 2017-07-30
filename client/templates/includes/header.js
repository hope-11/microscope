/**
 * Created by Grace on 2017/7/30.
 */
Template.header.helpers({
    activeRouteClass: function () {
        var args=Array.prototype.slice.call(arguments, 0);
        args.pop();
console.log(args)
        var active=_.any(args, function (name) {
            console.log("name--"+name)
            return Router.current() && Router.current().route.getName() === name;
        });

        return active && 'active';
    }
})