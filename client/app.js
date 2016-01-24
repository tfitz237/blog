angular.module('app', ['angular-meteor'])
.controller('PostCtrl', PostCtrl);

PostCtrl.$inject = ['$scope', '$meteor'];

function PostCtrl($scope, $meteor) {
	
	//$scope.posts = $meteor.collection(Post);
	$scope.posts = [
		{ 
			id: '1',
			title: 'First Post',
			text: 'lorem ipsum this is my first blog post',
			image: 'https://lh3.googleusercontent.com/5Qe5qAnblFwtkSzJZRkl4pSDJ4qtkcqvIzVzhLO6bmtkLYzjymwQA7xdyFMMmvU0USEvdCn9RG6L8jgvduS9WQcxQwC3vsIX7tuIIX655XryyhtBT0AYNnk7KWSqLnm-n94caAPW6i40Ip9lsUHrGqKiCTedQ3AE71hp5HEWbhQHAWpDRDsLTvgTdrO8nbwnWs9kCvh5PeOFCsIDunS6OrmwxhteHzqqpiJtCqTd5zsxLkC5C3phUR07PvkD19k_uF6w7BO38u6jNsgfR66umwDBvE-1EiVSxAFwF8RwDv8fpbS3daSP5kni6BWclJpwH-u_C4qt9dohyFrYEawa92AKHvLVSa944RNqkdLIJQ6pVNTPYSj1JmK9vxmJte64n5U4mX34d_ZE6x4xmFAzbI9ce391iAygIqROCJ2NBLJRvZYSqZuzN0hUeJn2N-WqqA9KsoDjORsvk6mDjHAurokgCKhJl22R_X24kBHDNd_HxcyhIZuNYhIaxj6SHFimQelqHp8cJNMUb0FZv5GY4OOo19D5CvICaW-zZGkgrF1AkY2qz6aDkqKY_eqCmVJIBpZ5=w381-h677-no'
 		},


	];
}