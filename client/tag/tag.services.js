angular.module('app')
.service('svcTag',svcTag);

function svcTag() {
    var svc = this;
    
    svc.addToPost = addToPost;
    svc.voteToPost = voteToPost;
    svc.delFromPost = delFromPost;
    svc.countVotesOnPost = countVotesOnPost;
    
    function addToPost(post, newTag) {
        Meteor.call('addTagToPost', post, newTag);            
    }
    
    function voteToPost(post, tag) {
        Meteor.call('voteTagToPost', post, tag);
    }
    

    function delFromPost(post, tag) {
        Meteor.call('delTagFromPost', tag);
        
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
    
    
}