'use strict';

/* Service */

angular.module('ToyotaTCheck.services.ItemList', [])
  .provider('ItemList', function() {

    var baseUrl = './';

    this.setBaseUrl = function setBaseUrl(url) {
      baseUrl = url;
    };

    this.$get = ['$http', '$log', function($http, $log) {

      return {
        query: function() {
          var checklists = [];

          $http.get(baseUrl + 'checklist.json')
            .then(function(response) {
              angular.forEach(response.data, function(item) {
                checklists.push(item);
              });
            }, function(error) {
              $log.log(error);
            });

          return checklists;
        }
      };
    }];

  });
