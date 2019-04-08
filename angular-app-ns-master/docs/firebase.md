# Firebase Overview

[Firebase](https://www.firebase.com/) is a powerful API to store and sync data in realtime.

## AngularFire

An optional helper library for wiring up Firebase within your app.

```html
<!-- Firebase -->
<script src="https://cdn.firebase.com/js/client/1.0.15/firebase.js"></script>
<!-- AngularJS -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js"></script>
<!-- AngularFire Library -->
<script src="https://cdn.firebase.com/libs/angularfire/0.7.1/angularfire.min.js"></script>

<script>
var myApp = angular.module("MyApp", ["firebase"]);

function MyController($scope, $firebase) {
  var peopleRef = new Firebase("https://<my-firebase>.firebaseio.com/people");
  $scope.people = $firebase(peopleRef);
  $scope.addPerson = function() {
    // AngularFire $add method
    $scope.people.$add($scope.newPerson);
    //or add a new person manually
    peopleRef.update({name: 'Alex', age: 35});
    $scope.newPerson = "";
  }
}
</script>
```
