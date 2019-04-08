/* global console */
'use strict';

/** Directive */

angular.module('ToyotaTCheck.directives.scope', [])
  /** Text binding with @ */
  .directive('childScopeOne', function() {
    return {
      scope: {
        text: '@myAttr'
      },
      template: 
        '<div>From custom directive: <em>{{text}}</em><br />' +
        'From custom directive: <input type="text" ng-model="text">' +
        '</div>'
    };
  })
  /** One-way binding with & */
  .directive('childScopeTwo', function() {
    return {
      scope: {
        inheritedValue: '&myAttr'
      },
      template: 
        '<div>From custom directive: <em>{{data}}</em><br />' +
        'From custom directive: <input type="text" ng-model="data">' +
        '</div>',
      link: function(scope, element, attrs) {
        scope.data = scope.inheritedValue();
      }
    };
  });
