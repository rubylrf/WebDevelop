# Best practice in AngularJS

* It's a best practice in Angular to bind references in the views by an attribute on an object, rather than the raw object itself.

```html
<p>Hello {{data.msg}}</p>
```

* Name our controllers as [Name]Controller, rather than [Name]Ctrl.

```javascript
angular.module('app').controller('LogController');
```

