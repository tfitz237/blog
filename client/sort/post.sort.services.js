angular.module('app')
.service('svcSort', svcSort);

function svcSort() {
	var svc = this;

	svc.sort = sortOrder;
	svc.toggleOption = sortToggle;
	svc.toggleDirection = sortDirToggle;
	svc.direction = true;
	svc.option = 'high';


	svc.getDirection = function() { return svc.direction; };
	svc.getOption = function() { return svc.option; };
	

	function sortDirToggle() {
		svc.direction = (svc.direction) ? false : true;

		return svc.direction;
	}

	function totalVotes(post) {
		var total = 0;
		for (var i in post.tags) {
			total += post.tags[i].votes;
		}
		return total;
	}

	function topVotes(post) {
		var top = 0;
		for (var i in post.tags) {
			if (post.tags[i].votes > top) {
				top = post.tags[i].votes;
			}
		}
		return top;
	}

	function sortToggle() {
		switch (svc.option) {
			case 'high':
				svc.option = 'low';
				break;
			case 'low':
				svc.option = 'pop';
				break;
			case 'pop':
				svc.option = 'new';
				break;
			case 'new':
				svc.option = 'high';
				break;
		}
		return svc.option;
	}

	function sortOrder(post) {
		switch (svc.option) {
			case 'high':
				svc.direction = true;
				return totalVotes(post);
				break;
			case 'low':
				svc.direction = false;
				return totalVotes(post);
				break;
			case 'pop':
				svc.direction = true;
				return topVotes(post);
				break;
			case 'new':
				svc.direction = true;
				return null;
		}
	} 




}