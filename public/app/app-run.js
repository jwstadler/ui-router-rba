angular.module('rbaApp')
.run(['$rootScope', '$log', 'authorization', 'principal', 'pages',
    
    function($rootScope, $log, authorization, principal, pages) {

		$rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {

			$log.debug('$stateChangeStart :: ', toState.name);

	      	// Does the toState require a role to access it?
	      	if (authorization.isRoleRequired(toState)) {
	      		$log.debug('authorization.isRoleRequired :: true');
	      		// Has the user authenticated?
		    	if (principal.isAuthenticated()) {
		    		$log.debug('principal.isAuthenticated :: true');
		    		// See if they are authorized to access the page
		    		if (!authorization.isAuthorized(toState, principal.getRoles())) {
		    			$log.debug('authorization.isAuthorized :: false');
		    			// Go to /unauthorized
		    			pages.goToUnauthorized();	    			
		    			event.preventDefault();
		    		}
		    	} else {
					$log.debug('principal.isAuthenticated :: false');
		    		// The user needs to authenticate so cache the destination
		    		$log.debug('principal.storeReturnTo :: ', toState.name);
		    		pages.storeReturnTo(toState, toStateParams);
		    		// Go to /login
		    		pages.goToLogin();
		    		event.preventDefault();
		    	}
		    } else {
		    	$log.debug('authorization.isRoleRequired :: false');
		    }
	        
      	});
    }

  ]);