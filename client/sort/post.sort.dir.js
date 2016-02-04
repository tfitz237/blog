angular.module('app')
.directive('feSortPosts',sortPosts);


function sortPosts() {
	return {
		restrict: 'E',
		templateUrl: 'client/sort/post.sort.view.html',
		controllerAs: 'ctrlSort',
		controller: SortCtrl
	};

}

SortCtrl.$inject = ['svcSort'];
function SortCtrl(svcSort) {
	var self = this;

	self.toggleOption = toggleOption;
	self.sortOption = svcSort.getOption();
	self.sortDirection = (svcSort.getDirection()) ? 'arrow_downward' : 'arrow_upward';

	function toggleOption() {
		self.sortOption =  svcSort.toggleOption();
	}
	function toggleDirection() {
		self.sortDirection =  (svcSort.toggleDirection()) ? 'arrow_downward' : 'arrow_upward';	
	}



}
