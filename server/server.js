Meteor.publish('posts', function() {
    return Posts.find();
});
Meteor.publish('tags', function() {
    return Tags.find();
})