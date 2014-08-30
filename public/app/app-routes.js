angular.module('rbaApp')
.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /.
  $urlRouterProvider.otherwise("/");

  // Define all the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "app/home.html"
    })
    
    // Setup a base secured state so the data.roles value
    // is passed down through child states.
    .state('securedBase', {
      abstract: true,
      url: "/secured",
      template: "<div ui-view />",
      data: {
        roles: ['authenticated']
      }
    })
    // This state is accessible to any authenticated user.
    .state('authenticated', {
      parent: 'securedBase',
      url: "/authenticated",
      templateUrl: "app/secured/authenticated.html"
    })
    // Override the data.roles value to restrict to admin
    // only users.
    .state('admin-only', {
      parent: 'securedBase',
      url: "/admin-only",
      templateUrl: "app/secured/admin-only.html",
      data: {
        roles: ['admin']
      }
    })

    // This state is not secured and does not require login
    .state('unsecured', {
      url: "/unsecured",
      templateUrl: "app/unsecured/unsecured.html"
    })

    // The login state where all the magic happens.
    .state('login', {
      url: "/login",
      templateUrl: "app/login/login.html",
      controller: 'LoginCtrl'
    })

    // The logoff destination.
    .state('logout', {
      url: "/logout",
      templateUrl: "app/login/logout.html",
      controller: function(principal) {
        principal.logout();
      }
    })

    // The unauthorized state where users are redirected if
    // they don't have permission to access a page.
    .state('unauthorized', {
      url: "/unauthorized",
      templateUrl: "app/login/unauthorized.html"
    });

});