'use strict';

/* Service */

angular.module('ToyotaTCheck.services.Log', [])
  .factory('Log', [
    '$firebase',
    '$log',
    '$q',
    'FirebaseService',
    'User',
    function($firebase, $log, $q, FirebaseService, User) {
      var changeLog = [];

      return {
        /**
         * @param Log {Object}  -  ??
         * @returns {Object}
         */
        add: function(Log) {
          Log = Log || {};
          Log.user = User.getUserObjectData().email;
          FirebaseService.logs.$add({
            id: Log.id,
            user: Log.user,
            changedValue: Log.value,
            title: Log.title,
            timestamp: Firebase.ServerValue.TIMESTAMP
          });

          return Log;
        },
        get: function() {
          return $firebase(FirebaseService.root.child('logs'));
        }
      };
    }
  ]);
