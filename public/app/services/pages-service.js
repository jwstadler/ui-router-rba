angular.module('rbaApp').service('pages', 
	['$state', function($state) {

	const self = this;

	// Stores { stateName: 'home', stateParams: {} }
	var returnTo = null;

	this.storeReturnTo = function(toState, toStateParams) {
		returnTo = { 
			stateName: toState.name, 
			stateParams: toStateParams 
		};
	};

	this.goToReturnTo = function() {

		// If we have a return to, go there
		if (returnTo) {
			stateName = returnTo.stateName;
			stateParams = returnTo.stateParams;

			// Handle the special case where the state is the login
			// page. In this case we want to go to the home page.
			if (stateName != 'login') {
				return $state.go(stateName, stateParams);
			}
		}

		// For all other cases, go to the home page
		return self.goToHome();
		
	};

	this.goToHome = function() {
		return $state.go('home');
	};

	this.goToLogin = function() {
		return $state.go('login', null, { location: false });
	};

	this.goToLogout = function() {
		return $state.go('logout');
	};

	this.goToUnauthorized = function() {
		return $state.go('unauthorized', null, { location: false });
	};

}]);