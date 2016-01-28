angular.module('app')

.directive('feTag', feTag);


function feTag() {
	return {
		restrict: 'E',
		templateUrl: 'client/tag/tag.view.html',
		controllerAs: 'ctrlTag',
		controller: TagCtrl,
		link: function (scope, element, attrs) {
		    element.addClass('cyan darken-2 post-tags post-tagBox');
		    
		}
	};
}

TagCtrl.$inject= ['$scope', '$element', '$attrs', '$meteor', '$reactive'];
function TagCtrl($scope, $element, $attrs, $meteor, $reactive) {
	var self = this;

	$reactive(self).attach($scope);
	self.postId = $scope.post._id;
	self.postOwner = $scope.post.owner;
	self.subscribe('tags');
	self.tags = [
	    {"postId" : "zzgZzcfYuSBxjS5ye",'title':'lol'},
	    {"postId" : "zzgZzcfYuSBxjS5ye",'title':'yeahright'},
	    {"postId" : "ErD5yMLSxpqupnHuG", 'title':'thisisit'},
	    
	];
	self.getTags = getTags;
    self.showMenu = showMenu;	
	console.log(self);	
	
	function getTags() {
	    var tags = [];
	    for (var i = 0; i < self.tags.length; i++) {
	        if(self.tags[i].postId == self.postId) {
	            tags.push(self.tags[i]);
	        }
	    }
	    return tags;
	}
	
	function showMenu() {
	    return Meteor.userId() == self.postOwner;
	    
	}
	
	
}