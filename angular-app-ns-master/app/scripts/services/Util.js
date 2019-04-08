'use strict';

/* Service */

angular.module('ToyotaTCheck.services.Util', [])
  .factory('Util', [
    '$firebase',
    '$log',
    'FirebaseService',
    function($firebase, $log, FirebaseService) {

      return {
        /**
         * @param ids {Array}  Example: ["1", "2", "3"]
         * @param dictionary {Object}  Example: {"1": { "id": "1", "title": "lorem", "children": ["5", "6", "7"] }}
         * @returns {Array}
         */
        getItemTree: function getItemTree(ids, dictionary) {
          var itemTree = [], item;

          angular.forEach(ids, function(id) {
            item = $firebase(FirebaseService.root.child('/items/' + id));
            if (item.children && item.children.length > 0) {
              item.children = getItemTree(item.children, dictionary);
            }
            itemTree.push(item);
          });

          return itemTree;
        }
      };
    }
  ]);
