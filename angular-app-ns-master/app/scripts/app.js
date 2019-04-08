'use strict';

// Declare app level module which depends on filters, and services
angular.module('ToyotaTCheck', [
    'ngRoute',
    'ngAnimate',
    'firebase',
    /** Services */
    'ToyotaTCheck.services.ItemList',
    'ToyotaTCheck.services.Item',
    'ToyotaTCheck.services.Firebase',
    'ToyotaTCheck.services.User',
    'ToyotaTCheck.services.Util',
    'ToyotaTCheck.services.Log',
    /** Filters */
    'ToyotaTCheck.filters.itemFilter',
    /** Directives */
    'ToyotaTCheck.directives.loadingIndicator',
    'ToyotaTCheck.directives.datepicker',
    'ToyotaTCheck.directives.dialog',
    /** Controllers */
    'ToyotaTCheck.controllers.ItemListController',
    'ToyotaTCheck.controllers.ItemController',
    'ToyotaTCheck.controllers.LoginController',
    'ToyotaTCheck.controllers.CategoryController',
    'ToyotaTCheck.controllers.LogController'
  ])
  .config(['ItemListProvider', function(ItemListProvider) {
    ItemListProvider.setBaseUrl('./backend/');
  }])
  .config(['FirebaseServiceProvider', function(FirebaseServiceProvider) {
    FirebaseServiceProvider.setFirebaseUrl('https://tcheck.firebaseio.com');
  }])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ItemListController'
      })
      .when('/log', {
        templateUrl: 'views/log.html',
        controller: 'LogController'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);
