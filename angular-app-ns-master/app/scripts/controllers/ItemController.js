'use strict';

/** Controller */

angular.module('ToyotaTCheck.controllers.ItemController', [])
  .controller('ItemController', [
    '$scope',
    '$firebase',
    '$log',
    '$q',
    '$timeout',
    '$window',
    'FirebaseService',
    'Item',
    'Log',
    'Util',
    function($scope, $firebase, $log, $q, $timeout, $window, FirebaseService, Item, Log, Util) {

      var tplBaseUrl = './scripts/directives/templates/',
        iconBaseUrl = './styles/images/';

      $scope.isSaveBtnDisabled = false;
      $scope.isItemChanged = false;
      $scope.isFlag = ($scope.item.status === 'flag' ? 1 : 0);

      switch ($scope.item.status) {
      case 'flag':
        $scope.statusIconPath = iconBaseUrl + 'flag.png';
        break;
      default:
        $scope.statusIconPath = iconBaseUrl + 'blank.png';
      }

      $scope.templateUrl = tplBaseUrl +
        ($scope.item.type === 'sub-category' ? 'unswipable.html' : 'swipable.html');

      switch ($scope.item.fieldType) {
      case 'list':
        $scope.years = FirebaseService.years;
        $scope.inputFieldTemplateUrl = tplBaseUrl + 'iList.html';
        break;
      case 'date':
        $scope.inputFieldTemplateUrl = tplBaseUrl + 'iDatepicker.html';
        break;
      default:
        $scope.inputFieldTemplateUrl = tplBaseUrl + 'iText.html';
        break;
      }

      $scope.childItems = [];
      $firebase(FirebaseService.root.child('items'))
        .$on('loaded', function(childSnapshot) {
          $scope.childItems = Util.getItemTree($scope.item.children, childSnapshot);
        });

      $scope.flag = $firebase(FirebaseService.root.child('/items/' + $scope.item.id + '/flagMsg'));
      $scope.item = $firebase(FirebaseService.root.child('/items/' + $scope.item.id));

      $scope.saveItemValue = function() {
        $scope.isSaveBtnDisabled = true;
        $scope.loadingOverlay.isShow = true;
        $scope.item.$save()
          .then(function() {
            Log.add({
              id: $scope.item.id,
              title: $scope.item.title,
              key: 'value',
              value: $scope.item.value
            });
            $scope.isSaveBtnDisabled = false;
            $scope.loadingOverlay.isShow = false;
          });
      };

      $scope.item.$on('child_changed', function() {
        $scope.isItemChanged = true;
        $timeout(function() {
          $scope.isItemChanged = false;
        }, 1100);
      });

      $scope.flag.$on('loaded', function(fff) {
        $scope.flag.$on('change', function(childSnapshot) {
          if ($scope.item.flagMsg === '') {
            $scope.isFlag = 0;
            $scope.statusIconPath = iconBaseUrl + 'blank.png';
          } else {
            $scope.isFlag = 1;
            $scope.statusIconPath = iconBaseUrl + 'flag.png';
          }
        });
      });
      // Hack: Prevent binding event more than once
      $scope.$on('$destroy', function() {
        $scope.item.$off('child_changed');
      });

      $scope.saveFlag = function() {
        if ($scope.item.flagMsg === '') {
          $scope.item.$update({
            flagMsg: '',
            status: ''
          });
          $scope.isFlag = 0;
          $scope.statusIconPath = iconBaseUrl + 'blank.png';

        } else {
          $scope.item.$update({
            flagMsg: $scope.item.flagMsg,
            status: 'flag'
          });
          $scope.isFlag = 1;
          $scope.statusIconPath = iconBaseUrl + 'flag.png';
        }
        Log.add({
          id: $scope.item.id,
          title: $scope.item.title,
          key: 'status',
          value: $scope.item.status
        });
        Log.add({
          id: $scope.item.id,
          title: $scope.item.title,
          key: 'flagMsg',
          value: $scope.item.flagMsg
        });
      };
    }
  ]);
