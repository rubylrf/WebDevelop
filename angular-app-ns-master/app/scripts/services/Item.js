'use strict';

/* Service */

angular.module('ToyotaTCheck.services.Item', [])
  .factory('Item', [
    '$http',
    '$q',
    '$log',
    function($http, $q, $log) {

      var baseUrl = './backend/';

      return {
        save: function(item) {

          return $http.post(baseUrl + 'service.php', {
            'data': {
              'id': item.id,
              'title': item.title,
              'type': item.type
            }

          }).then(function(response) {
            var data = response.data;

            if (data.status == 'failure') {
              return $q.reject(data.msg);

            } else {
              return data;
            }

          }, function(error) {
            return $q.reject(error);
          });
        }
      };

  }]);
