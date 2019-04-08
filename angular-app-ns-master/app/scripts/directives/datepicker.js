'use strict';

/** Directive */

angular.module('ToyotaTCheck.directives.datepicker', [])
  .directive('datepicker', function() {
    return {
      restrict: 'A',
      require: '?ngModel',
      scope: {},
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return;
        element.datepicker({
          dateFormat: 'dd/mm/yy'
        });
      }
    };
  });
