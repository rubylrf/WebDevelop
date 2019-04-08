/* global console */
'use strict';

/** Directive */

/**
 * Test `terminal` prop
 */

angular.module('ToyotaTCheck.directives.terminal', [])
  .directive('terminalDirectiveFirst', function() {
    return {
      priority: 0,
      terminal: 0,
      link: function() {
        // console.log('<p>Directive with priority = 0, terminal = true</p>');
      }
    };
  })
  .directive('terminalDirectiveSecond', function() {
    return {
      priority: 100,
      replace: 1,
      terminal: 1,
      link: function() {
        // console.log('<p>Directive with priority = 100, terminal = true</p>');
      }
    };
  });
