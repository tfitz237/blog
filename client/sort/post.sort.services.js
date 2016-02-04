angular.module('app')
.service('svcSort', svcSort);

svcSort.$inject = [];
function svcSort() {
	var svc = this;
	svc.sort = sortOrder;
	svc.sort2 = sortOrder2;
	svc.toggleOption = sortToggle;
	svc.option = 'pop';

	svc.getOption = function() { return svc.option; };
	


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
			case 'pop':
				svc.option = 'high';
				break;
			case 'high':
				svc.option = 'new';
				break;
			case 'new':
				svc.option = 'pop';
				break;
		}
		
		return svc.option;
	}

	function sortOrder(post) {
		var answer;
		switch (svc.option) {
			case 'high':
				answer = totalVotes(post);
				break;
			case 'pop':
				answer = topVotes(post);
				break;
			case 'new':
				answer = null;
				break;
		}
		return answer;
	} 
	function sortOrder2(post) {
		var answer;
		if(svc.option == 'pop') {
			answer = totalVotes(post);
		}
		return answer;
	} 



}