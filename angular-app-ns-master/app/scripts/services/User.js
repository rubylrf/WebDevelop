'use strict';

/* Service */

angular.module('ToyotaTCheck.services.User', [])
  .factory('User', [
    'FirebaseService',
    '$firebase',
    '$location',
    '$rootScope',
    '$log',
    function(FirebaseService, $firebase, $location, $rootScope, $log) {
      var userData = {
          isLogin: false,
          userObjectData: null,
          errorMsg: ''
        },
        auth = new FirebaseSimpleLogin(FirebaseService.root, function(error, user) {
          $rootScope.$apply(_callback(error, user));
        });

      function _callback(error, user) {
        // Reset firebase connections, generate correct access
        FirebaseService.reset();

        if (error) {
          // An error occurred while attempting login
          // Error code: <https://www.firebase.com/docs/security/simple-login-overview.html#Full Error Listing>

          userData.isLogin = false;

          switch (error.code) {
          case 'INVALID_EMAIL':
            userData.errorMsg = 'The specified email address is incorrect.';
            break;
          case 'INVALID_PASSWORD':
            userData.errorMsg = 'The specified password is incorrect.';
            break;
          case 'INVALID_USER':
            userData.errorMsg = 'The specified user does not exist.';
            break;
          default:
            userData.errorMsg = 'Login error.';
            break;
          }

        } else if (user) {
          // User authenticated with Firebase

          userData.isLogin = true;
          userData.userObjectData = user;

        } else {
          // User is logged out

          userData.isLogin = false;
        }
      }

      return {
        getErrorMsg: function() {
          return userData.errorMsg;
        },
        getUserObjectData: function() {
          return userData.userObjectData;
        },
        isLogin: function() {
          return userData.isLogin;
        },
        login: function(email, password, isRememberMe) {
          if (!userData.isLogin) {
            auth.login('password', {
              'email': email,
              'password': password,
              rememberMe: isRememberMe
            });
          }
        },
        logout: function() {
          auth.logout();
        }
      };
    }
  ]);
