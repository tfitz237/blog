angular.module('app')

.directive('feTag', feTag)
.directive('restrict', restrict);

restrict.$inject = ['$parse'];
function restrict($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, iElement, iAttrs, controller) {
            scope.$watch(iAttrs.ngModel, function(value) {
                if (!value) {
                    return;
                }
                $parse(iAttrs.ngModel).assign(scope, value.toLowerCase().replace(new RegExp(iAttrs.restrict, 'g'), '').replace(/\s+/g, '-'));
            });
        }
    };
}

function feTag() {
	return {
		restrict: 'E',
		templateUrl: 'client/tag/tag.view.html',
		controllerAs: 'ctrlTag',
		controller: TagCtrl,
		link: function (scope, element, attrs) {
		    element.addClass('post-tags');
		    
		}
	};
}

TagCtrl.$inject= ['$scope', '$element', '$attrs', '$meteor', '$reactive', 'svcTag'];
function TagCtrl($scope, $element, $attrs, $meteor, $reactive, svcTag) {
	var self = this;

	$reactive(self).attach($scope);
	self.post = $scope.post;
	self.fn = {
		showMenu: showMenu,
		showTagModal: showTagModal,
		showTagMenu: showTagMenu,
		addTagModal: addTagModal,
		openTagMenu: openTagMenu,
		delTag: delTag,
		voteTag: voteTag,
		addToPost: addToPost,
		totalVotes: totalVotes,
		viewTags: viewTags,
	};
	self.addButton = "add_box";
	self.tagModal = false;
	self.newTag = '';
	self.tagMenu = {
		view: false
	};

	function showMenu() {
	    return (svcTag.countVotesOnPost(self.post) < 5 && Meteor.userId());
	}
	function showTagMenu() {
		return self.tagMenu.view == true;
	}
	function showTagModal() {
		return self.tagModal == true; 
	}
	
	
	function addTagModal() {
	 	self.tagModal = (self.tagModal == true) ? false : true; 
	 	self.addButton= (self.tagModal == true) ? "indeterminate_check_box" : "add_box";
	}
	function openTagMenu(tag) {
		if (self.tagMenu.view) {
			self.tagMenu.view = false;
			self.tagMenu.post = {};
			self.tagMenu.tag = {};
		} else {
			self.tagMenu.view = true;
			self.tagMenu.post = self.post;
			self.tagMenu.tag = tag;
		}
	}
	
	
	function addToPost() {
		svcTag.addToPost(self.post, self.newTag);
		self.tagModal = false;
		self.newTag = '';
		self.addButton = "add_box";
	}
	
	function voteTag() {
		svcTag.voteToPost(self.tagMenu.post, self.tagMenu.tag);
		openTagMenu();
	}
	
	function delTag() {
		svcTag.delFromPost(self.tagMenu.post, self.tagMenu.tag);
		openTagMenu();
	}
	
	function totalVotes(post) {
		var total = 0;
		for (var i in post.tags) {
			total += post.tags[i].votes;
		}
		return total;
	} 
	
	function viewTags() {
		$scope.$parent.$parent.ctrlPost.tagList = self.post.tags;
		$('#modal-'+'tagList').openModal();
		
		
	}
}