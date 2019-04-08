# Demo Overview

* [Organization](#organization)
* [Data structure in firebase](#data-structure-in-firebase)
* [Index page](#index-page)
* [Main method](#main-method)
* [Views](#views)
* [Controllers](#controllers)
* [Directives](#directives)
* [Filters](#filters)
* [Services](#services)
* [Libraries](#libraries)
* [Styles](#styles)

User should login to this app first. User could be an admin or a guest. Admins can edit the items and guests not. They both could see the logs. Item modified by one user will reflect to other users in realtime. Logs are updated in realtime, too. At last, user can logout this application.

## Organization

```
app
├── index.html
├── scripts
│   ├── controllers
│   │   └── LoginController.js
│   │   └── ...
│   ├── directives
│   │   └── datepicker.js
│   │   └── ...
│   ├── filters
│   │   └── itemFilter.js
│   │   └── ...
│   ├── services
│   │   └── Log.js
│   │   └── ...
│   ├── vendor
│   │   ├── angular.js
│   │   ├── angular.min.js
│   │   ├── firebase.js
│   │   └── angularfire.js
│   └── app.js
├── styles
│   ├── images
│   ├── main.css
│   └── ...
└── views
    ├── login.html
    └── ...
```

## Data structure in firebase

[data.json](../app/backend/checklist-ns.json)

Or you could get the data from firebase in realtime through <https://66.firebaseio.com/.json> by HTTP GET request (or just visit in browsers).

## Index page

[link to index.html](../app/index.html)

Use `ngApp` directive on `<body>`, to declare that we use `ToyotaTCheck` to manage our app. `ToyotaTCheck` is the main module of our app.

`ngView` is a directive that complements the `$route` service by including the rendered template of the current route into the main layout (`index.html`) file. Every time the current route changes, the included view changes with it according to the configuration of the `$route` service.

Include js and css libraries.

```html
<body ng-app="ToyotaTCheck">
  <h1>Demo</h1>
  <div ng-view></div>
  <!-- JavaScript libraries -->
  <script src="scripts/vendor/jquery-1.10.2.js"></script>
  <script src="scripts/vendor/angular.js"></script>
  <script src="scripts/vendor/angular-route.js"></script>
  <script src="scripts/vendor/angular-animate.js"></script>
  <script src="scripts/app.js"></script>
  <script src="scripts/controllers/ItemListController.js"></script>
  <script src="scripts/controllers/ItemController.js"></script>
  <script src="scripts/controllers/LoginController.js"></script>
  <script src="scripts/controllers/CategoryController.js"></script>
  <script src="scripts/controllers/LogController.js"></script>
  <script src="scripts/services/ItemList.js"></script>
  <script src="scripts/services/Item.js"></script>
  <script src="scripts/services/Firebase.js"></script>
  <script src="scripts/services/User.js"></script>
  <script src="scripts/services/Util.js"></script>
  <script src="scripts/services/Log.js"></script>
  <script src="scripts/directives/loadingIndicator.js"></script>
  <script src="scripts/directives/datepicker.js"></script>
  <script src="scripts/directives/dialog.js"></script>
  <script src="scripts/filters/itemFilter.js"></script>
  <script src="scripts/vendor/firebase.js"></script>
  <script src="scripts/vendor/angularfire.js"></script>
  <script src="scripts/vendor/firebase-simple-login.js"></script>
  <script src="scripts/vendor/jquery-ui-1.10.4.min.js"></script>
</body>
```

## Main method

[app.js](../app/scripts/app.js) is like a main method in other programming languages. ToyotaTCheck module assigned to `ngApp` directive is defined here. We inject all the needed modules and config them.

Here, we inject modules like `ngRoute`, `firebase` and all the services, filters, directives and controllers. Then we config the `firebase base url` to `https://tcheck.firebaseio.com`. Also, we config the routes by `$routeProvider` service.

```javascript
'use strict';

// Declare app level module which depends on filters, and services
angular.module('ToyotaTCheck', [
    'ngRoute',
    'ngAnimate',
    'firebase',
    /** Services */
    'ToyotaTCheck.services.ItemList',
    'ToyotaTCheck.services.Item',
    'ToyotaTCheck.services.Firebase',
    'ToyotaTCheck.services.User',
    'ToyotaTCheck.services.Util',
    'ToyotaTCheck.services.Log',
    /** Filters */
    'ToyotaTCheck.filters.itemFilter',
    /** Directives */
    'ToyotaTCheck.directives.loadingIndicator',
    'ToyotaTCheck.directives.datepicker',
    'ToyotaTCheck.directives.dialog',
    /** Controllers */
    'ToyotaTCheck.controllers.ItemListController',
    'ToyotaTCheck.controllers.ItemController',
    'ToyotaTCheck.controllers.LoginController',
    'ToyotaTCheck.controllers.CategoryController',
    'ToyotaTCheck.controllers.LogController'
  ])
  .config(['ItemListProvider', function(ItemListProvider) {
    ItemListProvider.setBaseUrl('./backend/');
  }])
  .config(['FirebaseServiceProvider', function(FirebaseServiceProvider) {
    FirebaseServiceProvider.setFirebaseUrl('https://tcheck.firebaseio.com');
  }])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ItemListController'
      })
      .when('/log', {
        templateUrl: 'views/log.html',
        controller: 'LogController'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);
```

## Views

In [app.js](../app/scripts/app.js), we config the routes to different views. In this app, we have 3 views:

1. login.html
2. list.html
3. log.html

These [views](../app/views) are HTML files, located in `views` directory. According to different urls, application will show corresponding views base on the route rules. For example, call `$location.path('/login')`, login view will show by putting `login.html` into `ngView` element as in [Index page](#index-page) section.

## Controllers

In Angular, a `Controller` is a JavaScript constructor function that is used to augment the Angular Scope.

Use controllers to:

* Set up the initial state of the `$scope` object.
* Add behavior to the `$scope` object.

[Link to Controllers](../app/scripts/controllers)

| Controllers        | Details                                   |
| ------------------ | ----------------------------------------- |
| LoginController    | Used in login view, control user login    |
| ItemListController | Control filter, logout and view logs      |
| CategoryController | Init categories                           |
| ItemController     | Control each items                        |
| LogController      | Used in log view                          |

Example code:

```javascript
'use strict';

/** Controller */

angular.module('ToyotaTCheck.controllers.LoginController', [])
  .controller('LoginController', [
    '$scope',
    'User',
    '$location',
    '$log',
    function($scope, User, $location, $log) {
      $scope.errorMsg = '';
      $scope.loginDisabled = false;
      $scope.isRememberMe = true;

      $scope.authorize = function() {
        User.authorize().then(function(status) {
          if (status == 'yes') {
            $location.path('/list');
          }
        });
      };

      $scope.login = function() {
        if ($scope.loginForm.$error.required === false) {
          $scope.loginDisabled = true;
          User.login($scope.email, $scope.password, 0);
        }
      };

      $scope.$watch(function() {
        return User.isLogin();
      }, function(newValue, oldValue) {
        if (newValue === true) {
          $scope.loginDisabled = false;
          $scope.errorMsg = '';
          $location.path('/list');
        }
      });

      $scope.$watch(function() {
        return User.getErrorMsg();
      }, function(newValue, oldValue) {
        $scope.errorMsg = newValue;
        $scope.loginDisabled = false;
      });
    }
  ]);
```

## Directives

We use directives to extend the ability of HTML. We defined 3 directives:

[Link to Directives](../app/scripts/directives)

| Directives       | Details                             |
| ---------------- | ----------------------------------- |
| datepicker       | Integrate with jQueryUI datepicker  |
| dialog           | Integrate with jQueryUI dialog      |
| loadingIndicator | Add a loading indicator overlay     |

Example code:

```javascript
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
```

## Filters

A filter formats the value of an expression for display to the user. They can be used in view templates, controllers or services.

We have one filter named `itemFilter`. It can filter the items according to different status: flag, N/A or show all.

[Link to Filters](../app/scripts/filters)

```javascript
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
```

## Services

Angular services are substitutable objects that are wired together using dependency injection (DI). You can use services to organize and share code across your app.

Angular services are:

* Lazily instantiated – Angular only instantiates a service when an application component depends on it.
* Singletons – Each component dependent on a service gets a reference to the single instance generated by the service factory.

> Note: Like other core Angular identifiers built-in services always start with $ (e.g. $http).

[Link to Services](../app/scripts/services)

| Services | Details                                 |
| -------- | --------------------------------------- |
| Firebase | Keey firebase references                |
| User     | User authority                          |
| Log      | getter and setter of Log                |
| Util     | Helper function help generate item tree |

Example code:

```javascript
'use strict';

/* Service */

angular.module('ToyotaTCheck.services.Util', [])
  .factory('Util', [
    '$log',
    function($log) {

      return {
        /**
         * @param ids {Array}  Example: ["1", "2", "3"]
         * @param dictionary {Object}  Example: {"1": { "id": "1", "title": "lorem", "children": ["5", "6", "7"] }}
         * @returns {Array}  
         */
        getItemTree: function getItemTree(ids, dictionary) {
          var itemTree = [], item;

          angular.forEach(ids, function(id) {
            item = dictionary[id];
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
```

## Libraries

All the 3rd party libraries put in the [vendor directory](../app/scripts/vendor).

## Styles

All the style sheets and images are put in [styles directory](../app/styles).
