angular.module('rbaApp', ['ngCookies', 'ui.router'])

// Define any global constants
.constant('DEBUG', true)

// Apply any global configurations that need to be performed
.config(['$logProvider', '$compileProvider', 'DEBUG', function($logProvider, $compileProvider, DEBUG) {

	// Enable/Disable logging of debug messages
	$logProvider.debugEnabled(DEBUG);
	
	// $compileProvider.debugInfoEnabled(DEBUG); Available in 1.3

}]);