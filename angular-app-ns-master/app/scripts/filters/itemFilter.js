'use strict';

/** Filter */

angular.module('ToyotaTCheck.filters.itemFilter', [])
  .filter('itemFilter', [
    '$filter',
    '$log',
    function($filter, $log) {

      return function(items, itemStatus) {
        var exprFn = function(item) {
          var isPassed = function isPassed(item) {
            var len = 0;

            if (item.status == itemStatus) {
              return true;

            } else if (item.children) {
              len = item.children.length;

              if (!len) {
                return false;

              } else {
                for (var i = 0; i < len; i++) {
                  if (isPassed(item.children[i])) {
                    return true;
                  }
                }
              }

            } else {
              return false;
            }
          };

          if (itemStatus == 'all') {
            return true;

          } else {
            return isPassed(item);
          }
        };

        return $filter('filter')(items, exprFn);
      };
    }
  ]);
