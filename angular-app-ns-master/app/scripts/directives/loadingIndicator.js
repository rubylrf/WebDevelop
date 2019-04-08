'use strict';

/** Directive */

angular.module('ToyotaTCheck.directives.loadingIndicator', [])
  .directive('tcheckLoadingIndicator', function() {

    return {
      restrict: 'EA',
      template: '<div ng-class="{ loading: 1, show: loadingOverlay.isShow }">Loading...</div>',
      replace: 1,
      scope: {
        loadingOverlay: '='
      }
    };
  });
