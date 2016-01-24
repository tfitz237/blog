angular.module('app', ['angular-meteor','ngSanitize'])
.controller('PostCtrl', PostCtrl)
.directive('dropdown', dropdownDir);
PostCtrl.$inject = ['$scope', '$meteor','$sce', '$http'];

function PostCtrl($scope, $meteor,$sce, $http) {
	
	
	$scope.posts = $meteor.collection(Posts);
	console.log($scope.posts);
	$scope.addPost = addPost;
	$scope.embed = embed;
	$scope.editPost = editPost;
	$scope.deletePost = deletePost;
	$scope.newPost = {};
	function embed(embed) {
		return $sce.trustAsHtml(embed.html);
		
		
	}
	
	function addPost(type, post) {
		if(post._id == undefined) {
			post.type = type;
			if(post.type == 'music' || post.type == 'link') {
			$http({method: 'GET', url: 'https://api.embedly.com/1/oembed?key=afc044c2a50440c0bd8216adddc728f2&url='+post.url})
				.then(function successCallBack(response) {
				post.embed = response.data;
				$scope.posts.push(post);
				}, function errorCallback(response) {
					console.log(response);
				});
				$scope.newPost[type] = {};
			} else {
				$scope.posts.push(post);
			}
		}
		else {
			if(post.type == 'music' || post.type =='link') {
			$http({method: 'GET', url: 'https://api.embedly.com/1/oembed?key=afc044c2a50440c0bd8216adddc728f2&url='+post.url})
				.then(function successCallBack(response) {
				post.embed = response.data;
				console.log(post.embed);
				for (var i = 0; i < $scope.posts.length; i++) {
					if($scope.posts[i]._id == post._id) {
						$scope.posts[i] = post;
						$scope.newPost[type] = {};
					}
				}
				}, function errorCallback(response) {
					console.log(response);
				});

			} else {
				for (var i = 0; i < $scope.posts.length; i++) {
					if($scope.posts[i]._id == post._id) {
						$scope.posts[i] = post;
						$scope.newPost[type] = {};
					}
				}
			}
			
		}
	}
	
	function editPost(post) {
		$scope.newPost[post.type] = post;
		$('#modal-'+post.type).openModal();
		
		
	}
	
	function deletePost(post) {
		
		$scope.posts.remove(post._id);
	}
	
	

}

function dropdownDir() {
	return {
		template: function(elem, attr) {
			return '<a class="post-menu-link dropdown-button white-text" href="#" data-activates="post-menu-'+attr.id+'"><i class="material-icons">more_vert</i></a>';
		}	
	};
	
	
	
	
}