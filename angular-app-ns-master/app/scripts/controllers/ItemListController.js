'use strict';

/** Controller */

angular.module('ToyotaTCheck.controllers.ItemListController', [])
  .controller('ItemListController', [
    '$scope',
    '$location',
    'FirebaseService',
    'User',
    function($scope, $location, FirebaseService, User) {
      $scope.categories = FirebaseService.categories;
      $scope.itemStatus = 'all';
      $scope.isGuest = true;
      $scope.loadingOverlay = {
        isShow: 0
      };
      $scope.options = [{
        label: 'All items',
        value: 'all'
      }, {
        label: 'Flaged items',
        value: 'flag'
      }, {
        label: 'N/A items',
        value: 'na'
      }];

      $scope.authorize = function() {
        if (User.isLogin()) {
          $scope.email = User.getUserObjectData().email;
          $scope.isGuest = ($scope.email === 'guest@fabricgroup.com.au');
        } else {
          $location.path('/login');
        }
      };

      $scope.logout = function() {
        User.logout();
      };

      $scope.viewLog = function() {
        $location.path('/log');
      };

      $scope.$watch(function() {
        return User.isLogin();
      }, function(newValue, oldValue) {
        if (newValue === false) {
          $location.path('/login');
        }
      });
    }
  ]);
