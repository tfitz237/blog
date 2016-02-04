angular.module('app')
.directive('fePosts',fePosts)
.directive('dropdown', dropdownDir)
.directive('matBox', matBox);

function fePosts() {
	return {
		restrict: 'E',
		templateUrl: 'client/post/post.view.html',
		controllerAs: 'ctrlPost',
		controller: PostCtrl
	};
}

PostCtrl.$inject = ['$scope', '$meteor','$sce', '$reactive','svcPost', 'svcSort'];
function PostCtrl($scope, $meteor,$sce, $reactive, svcPost, svcSort) {
	var self = this;
	$reactive(self).attach($scope);
	self.subscribe('posts');
	self.subscribe('tags');
	$(document).ready(function(){
		$('.modal-trigger').leanModal();
		$('.dropdown-button').dropdown();
		$('.materialboxed').materialbox();
	});
		
	self.newPost = {};
	self.tagList = ['test'];
	self.postsEmbed = {};
	self.query = {};
	self.helpers({
		posts: () => {
			return Posts.find({}, {sort: {createdAt: -1}});
		}
	});
		
	self.fn = {
		addPost: addPost,
		editPost: editPost,
		deletePost : deletePost,
		openEmbed : openEmbed,
		closeEmbed : closeEmbed,
		embed : embed,
		showMenu : showMenu,
		fullText : fullText,
		sortOrder: sortOrder
	};
		
	function openEmbed(id) {
		var post = getPostById(id);
		self.postsEmbed[id] = $sce.trustAsHtml(post.embed.html);
	}
	function closeEmbed(id) {
		self.postsEmbed[id] = '';
	}	
	function embed(index) {
		return self.postsEmbed[index];
	}
		
	function addPost(type) {
		self.newPost[type] = svcPost.add(type,self.newPost[type]);
	}
	function editPost(id) {
		var post = getPostById(id);
		self.newPost[post.type] = post;
		$('#modal-'+post.type).openModal();	
	}
		
	function deletePost(post) {
		svcPost.del(post);
	}
		
	function getPostById(id) {
		for (var i in self.posts) {
			if (self.posts[i]._id == id) {
				return self.posts[i];
			}
		}
	}
		
	function showMenu(owner) {
		return Meteor.userId() == owner;
	}
		
	function fullText(post) {
		self.fullText = post;
		$('#modal-fulltext').openModal();
	}


	function sortOrder(post) {
		return svcSort.sort(post);
	}
}

function matBox() {
	return {
		link: function(scope,elem,attr){
			$('.materialboxed').materialbox();
		}
	};
}

dropdownDir.$inject = ['$compile'];
function dropdownDir($compile) {
	return {
		link: function(scope, elem, attr) {
			var template = '<a class="post-menu-link dropdown-button white-text" href="#" data-activates="post-menu-'+attr.id+'"><i class="material-icons">more_vert</i></a>';
			template = template + '				<ul id="post-menu-'+attr.id+'" class="dropdown-content"><li><a href="#" ng-click="ctrlPost.fn.editPost(\''+attr.id+'\')">Edit</a></li><li class="divider"></li><li><a href="#" ng-click="ctrlPost.fn.deletePost(\''+attr.id+'\')">Delete</a></li></ul>';
			var linkFn = $compile(template);
			var content = linkFn(scope);
			elem.html(content);
			$('.dropdown-button').dropdown();
		}
	};
}