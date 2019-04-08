'use strict';

/** Controller */

angular.module('ToyotaTCheck.controllers.LogController', [])
  .controller('LogController', [
    '$scope',
    '$location',
    '$log',
    'Log',
    'User',
    function($scope, $location, $log, Log, User) {
      $scope.logs = Log.get();

      $scope.authorize = function() {
        if (User.isLogin()) {
          $scope.email = User.getUserObjectData().email;
          $scope.isGuest = ($scope.email === 'guest@fabricgroup.com.au');
        } else {
          $location.path('/login');
        }
      };

      $scope.back = function() {
        $location.path('/list');
      };
    }
  ]);
