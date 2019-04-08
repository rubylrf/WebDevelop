/* global console */
/* global $ */
'use strict';

/** Directive */

angular.module('ToyotaTCheck.directives.dialog', [])
  .directive('dialog', function() {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return;
        
        $(element).on('click', function() {
          $('#flagMsg').val(scope.item.flagMsg);
          $("#flagDialog").dialog({
            title: 'Input flag message',
            buttons: [{
              text: "Save",
              click: function() {
                scope.$apply(function() {
                  ngModel.$setViewValue($('#flagMsg').val());
                  scope.saveFlag();
                });
                $(this).dialog("close");
              }
            }]
          });
        });
      }
    };
  });
