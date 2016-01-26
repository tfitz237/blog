angular.module('app', ['angular-meteor','ngSanitize','accounts.ui'])
//.controller('PostCtrl', PostCtrl)
.directive('fePosts',fePosts)
.directive('dropdown', dropdownDir)
.directive('matBox', matBox);
PostCtrl.$inject = ['$scope', '$meteor','$sce', '$reactive'];
dropdownDir.$inject = ['$compile'];


function fePosts() {
	return {
		restrict: 'E',
		templateUrl: 'client/main.html',
		controllerAs: 'ctrl',
		controller: PostCtrl
	};
}

function PostCtrl($scope, $meteor,$sce, $reactive) {
	var self = this;
	$reactive(self).attach($scope);
	this.subscribe('posts', function(){}, {
		onReady: go,
		onStop: stop
	});
		
	function go() {
				 $(document).ready(function(){
				$('.modal-trigger').leanModal();
				$('.dropdown-button').dropdown();
				$('.materialboxed').materialbox();
	  		});
		
		self.newPost = {};
		self.postsEmbed = {};
		self.query = {};
		
		self.helpers({
			posts: () => {
				return Posts.find({}, {sort: {createdAt: -1}});
			}
		});
		
		self.addPost = addPost;
		self.editPost = editPost;
		self.deletePost = deletePost;
		self.toggleEmbed = toggleEmbed;
		self.embed = embed;
		self.showMenu = showMenu;
		self.fullText = fullText;
		
		function toggleEmbed(id) {
			if(typeof self.postsEmbed[id] === "undefined") {
				var post = getPostById(id);
				self.postsEmbed[id] = $sce.trustAsHtml(post.embed.html);
			} else {
				self.postsEmbed[id] = undefined;
			}
		}
		
		function embed(index) {
			return self.postsEmbed[index];
			
			
		}
		
		function addPost(type, id = undefined) {
			if(typeof id === "undefined") {
				var post = self.newPost[type];
				Meteor.call('addPost', post);
				$('.dropdown-button').dropdown();
			} else {
				var post = self.newPost[type];
				Meteor.call('editPost', post);			
			}
				self.newPost[type] = {};
				$('#modal-'+post.type).closeModal();
				$('.lean-overlay').css('display','none');
		}
		
		function editPost(id) {
			var post = getPostById(id);
			self.newPost[post.type] = post;
			$('#modal-'+post.type).openModal();	
			
		}
		
		function deletePost(post) {
			Meteor.call('deletePost', post);
			
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
	
	}
	function stop() {
	}
}

function dropdownDir($compile) {
	return {
		link: function(scope, elem, attr) {
			var template = '<a class="post-menu-link dropdown-button white-text" href="#" data-activates="post-menu-'+attr.id+'"><i class="material-icons">more_vert</i></a>';
			template = template + '				<ul id="post-menu-'+attr.id+'" class="dropdown-content"><li><a href="#" ng-click="ctrl.editPost(\''+attr.id+'\')">Edit</a></li><li class="divider"></li><li><a href="#" ng-click="ctrl.deletePost(\''+attr.id+'\')">Delete</a></li></ul>';
			var linkFn = $compile(template);
			var content = linkFn(scope);
			elem.html(content);
			$('.dropdown-button').dropdown();
		}
	};
}

function matBox() {
	return {
		link: function(scope,elem,attr){
			$('.materialboxed').materialbox();
		}
	};
}

