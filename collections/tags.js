Meteor.methods({
    addTagToPost: addTag,
    delTagFromPost: deleteTag,
    voteTagToPost: incPop
});


function addTag(post, newTag ) {
    if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
    } else if (countVotesOnPost(post) <= 5) {
        var tag = {
            _id: new Meteor.Collection.ObjectID()._str,
            post_id: post._id,
            owner: Meteor.userId(),
            name: newTag,
            votes: 1,
            createdAt: new Date(),
            users: [Meteor.userId()]
        };
        Posts.update({_id: post._id}, {$push: {tags: tag }});
        
    }
    
    
}

function deleteTag(tag) {
    var post = Posts.findOne({"tags._id": tag._id});
    if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
    } else if (Meteor.userId() == tag.owner) {
        Posts.update(post._id, {$pull: {"tags": { "_id": tag._id }}});
        
    }
    
}

function incPop(post, tag) {
    if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
    } else {
        if (!ownsTagOnPost(post,tag) && countVotesOnPost(post) < 5 && !hasVotedOnTag(tag)) {
            Posts.update({_id: post._id, "tags._id": tag._id}, {$inc: {"tags.$.votes": 1}, $push: {"tags.$.users": Meteor.userId() }})
        }
        
    }
}



function ownsTagOnPost(post, tag) {
    for (var i in post.tags) {
         if (post.tags[i].owner == Meteor.userId() && post.tags[i]._id == tag._id) {
            return true;
         }
    }
    return false;
}
    
function hasVotedOnTag(tag) {
    for (var i in tag.users) {
        if (tag.users[i] == Meteor.userId()) {
            return true;
        }
    }
    return false;
}
    
    
function countVotesOnPost(post) {
    var count = 0;
    for (var i in post.tags) {
        if (post.tags[i].owner == Meteor.userId()) {
            count++;
        }
    }
    return count;
}