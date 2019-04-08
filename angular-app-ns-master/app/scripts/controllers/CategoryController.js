'use strict';

/** Controller */

angular.module('ToyotaTCheck.controllers.CategoryController', [])
  .controller('CategoryController', [
    '$scope',
    '$q',
    'FirebaseService',
    'Util',
    '$firebase',
    '$window',
    '$log',
    function($scope, $q, FirebaseService, Util, $firebase, $window, $log) {
      $scope.childItems = [];

      $firebase(FirebaseService.root.child('items'))
        .$on('loaded', function(childSnapshot) {
          $scope.childItems = Util.getItemTree($scope.category.directItems, childSnapshot);
        });

    }
  ]);
