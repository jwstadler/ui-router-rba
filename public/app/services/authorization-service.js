angular.module('rbaApp').service('authorization', 
	[ function() {

	const self = this;

	// Checks to see if the state requires a role
	// to gain access.
	this.isRoleRequired = function(toState) {
		return getRequiredRolesForState(toState).length;
	}

	// Checks to see if the user is authorized based on 
	// the state's roles and the user's roles. The 
	// userRoles must e an array of roles.
	this.isAuthorized = function(toState, userRoles) {
		// Get the roles from the state
		var requiredRoles = getRequiredRolesForState(toState);
		// Check and see if user has one of the roles
		for(var i = 0; i < requiredRoles.length; i++) {
			if (userRoles.indexOf(requiredRoles[i]) != -1) {
				return true;
			}
		}
		return false;
	}

	// A private method to return the list of roles extracted from 
	// the passed in state. It will always return an array.
	var getRequiredRolesForState = function(toState) {
		var roles = [];
		if (toState.data && toState.data.roles) {
			roles = toState.data.roles;
		}
		return roles;
	}

}]);