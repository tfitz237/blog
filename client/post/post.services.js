angular.module('app')
.service('svcPost', svcPost);

function svcPost() {
    var svc = this;
    svc.add = add;
    svc.edit = edit;
    svc.del = del;

    
    function add(type,post) {
		if(typeof post._id === "undefined") {
            post.type = type;
			Meteor.call('setPost', false, post);
			$('.dropdown-button').dropdown();
		} else {
			Meteor.call('setPost', true, post);			
		}
		$('#modal-'+post.type).closeModal();
		$('.lean-overlay').css('display','none');
        return {};
    }
    
    function edit(post) {
        
    }
    
    function del(post) {
        Meteor.call('deletePost', post);
    }
    
}

