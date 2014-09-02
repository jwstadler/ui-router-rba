angular.module('rbaApp').controller('LoginCtrl', 
	['$scope', '$q', 'principal', function($scope, $q, principal) {
	
	$scope.username = null;
	$scope.password = null;

	$scope.login = function() {

		return principal
			.login({ username: $scope.username, password: $scope.password })
			.then(
				null,
				function(response) {
					alert('Login failed');
					return $q.reject(response);
				}
			);
	};

}]);