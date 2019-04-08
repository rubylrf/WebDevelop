'use strict';

/** Controller */

angular.module('ToyotaTCheck.controllers.LoginController', [])
  .controller('LoginController', [
    '$scope',
    '$location',
    'User',
    function($scope, $location, User) {
      $scope.errorMsg = '';
      $scope.loginDisabled = false;
      $scope.isRememberMe = true;
      $scope.email = '';
      $scope.password = '';

      $scope.authorize = function() {
        User.authorize().then(function(status) {
          if (status == 'yes') {
            $location.path('/list');
          }
        });
      };

      $scope.login = function() {
        if ($scope.loginForm.$error.required === false) {
          $scope.loginDisabled = true;
          User.login($scope.email, $scope.password, 0);
        }
      };

      $scope.$watch(function() {
        return User.isLogin();
      }, function(newValue, oldValue) {
        if (newValue === true) {
          $scope.loginDisabled = false;
          $scope.errorMsg = '';
          $location.path('/list');
        }
      });

      $scope.$watch(function() {
        return User.getErrorMsg();
      }, function(newValue, oldValue) {
        $scope.errorMsg = newValue;
        $scope.loginDisabled = false;
      });
    }
  ]);
