angular.module('rbaApp').service('principal', 
	['$cookieStore', 'pages', '$q', '$timeout', 
	function($cookieStore, pages, $q, $timeout) {

	const self = this;

	// This is the cookie key where the current user is cached.
	const userCookieName = 'currentUser';

	// Stores the currently logged in user. This value should only ever be updated
	// by setUser and read by getUser. It should also only ever be null or a 
	// reference to a valid user.
	var currentUser = null;

	// A private function that caches the current user and also stores it in the 
	// cookie store in case a full page refresh occurs. Also ensure that an	
	// undefined value is converted to null.
	var setUser = function(user) {
		if (angular.isUndefined(user)) {
			user = null;
		}
		currentUser = user;
		if (currentUser) {
			$cookieStore.put(userCookieName, currentUser);
		} else {
			$cookieStore.remove(userCookieName);
		}
	}

	// Returns the currently logged in user, reading from the cookie store if
	// necessary.
	this.getUser = function() {

		// If we have a user cached, use it
		if (currentUser) {
			return currentUser;
		}

		// Attempt to lookup from the cookie
		var user = $cookieStore.get(userCookieName);
		if (!angular.isUndefined(currentUser)) {
			currentUser = user;
		}

		return currentUser;
	}

	// Returns the currently logged in user's roles. If there is no user or
	// the user doesn't have a roles property or it is null, an empty array
	// is returned.
	this.getRoles = function() {
		var user = self.getUser();
		if (user && user.roles) {
			return user.roles;
		} 
		return [];
	}

	// Returns true if the user is logged in, false otherwise
	this.isAuthenticated = function() {
		return self.getUser();
	}

	// Pass in the credentials { username: 'bob', password: 'blue' } to perform
	// the authentication.  If valid, it will redirect to the cached return to
	// url.
	this.login = function(credentials) {

		// Use timeout to fake out the rest call. You should inject
		// $http and mke the appropriate call.
		var deferred = $q.defer();
		$timeout(function() {
			if (credentials.username == 'admin' && credentials.password == 'admin') {
				deferred.resolve({ username: 'admin', roles: ['authenticated', 'admin']});
			}

			if (credentials.username == 'user' && credentials.password == 'user') {
				deferred.resolve({ username: 'user', roles: ['authenticated']});
			}
			deferred.reject(null);
		}, 1000);

		deferred.promise.then(
			function(response) {
				// Cache the user on a successful login
				setUser(response);
				pages.goToReturnTo();
				return response;
			}, function(response) {
				// Ensure the user is cleared on a failed login
				setUser(null);
				return $q.reject(response);
			});

		return deferred.promise;
	}

	// logoff the current user
	this.logout = function() {
		setUser(null);
		return pages.goToLogout();
	}

}]);