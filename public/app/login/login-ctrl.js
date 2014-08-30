angular.module('rbaApp').controller('LoginCtrl', 
	['$scope', 'principal', function($scope, principal) {
	
	$scope.username = null;
	$scope.password = null;

	$scope.login = function() {

		principal
			.login({ username: $scope.username, password: $scope.password })
			.then(
				null,
				function(response) {
					alert('Login failed');
				}
			);
	};

}]);