# Form Validation

* [Validation options](#validation-options)
* [Control Variables in Forms](#control-variables-in-forms)
* [CSS classes applied on form fields by Angular](#css-classes-applied-on-form-fields-by-angular)
* [Custom validation](#custom-validation)

## Validation options

Example HTML code:
```html
<form name="myForm" novalidate>
  <label name="email">Your email</label>
  <input type="email" name="email" ng-model="email" placeholder="Email Address" />
</form>
```

**We must ensure that the form has a `name` attribute associated with it.** Like `myForm` in above example.

List of all the validation options we have that we can place on an input field:

| Options      | Example                                   |
| :----------: | ----------------------------------------- |
| required     | `<input type="text" required>`            |
| ng-minlength | `<input type="text" ng-minlength=10>`     |
| ng-maxlength | `<input type="text" ng-minlength=10>`     |
| ng-pattern   | `<input type="text" ng-pattern=/a-zA-Z/>` |
| email        | `<input type="email">`                    |
| number       | `<input type="number">`                   |
| url          | `<input type="url">`                      |

## Control Variables in Forms

We could control the form status in real-time by the following variables:
( Common format: formName.inputFieldName.property )

| Form Status      | Angular Syntax                      | Returns                                                           |
| ---------------- | ------------------------------------|------------------------------------------------------------------ |
| Unmodified form? | `formName.inputFieldName.$pristine` | `true`: if user hasn't touched the form  `false`: if they have    |
| Modified form?   | `formName.inputFieldName.$dirty`    | `true`: if user has modified the form  `false`: if they haven't   |
| Valid form?      | `formName.inputFieldName.$valid`    | `true`: for valid  `false`: for invalid                           |
| Invalid form?    | `formName.inputFieldName.$invalid`  | `true`: for invalid  `false`: for valid                           |
| Errors           | `formName.inputFieldName.$error`    | This object contains all of the validations on a particular form. |

### One more word on `formName.inputFieldName.$error`

For example, we have the HTML code like this:
```html
<form action="" class="login-form" name="loginForm">
  <input autofocus="autofocus" type="email" name="email" id="email" ng-model="email" required>
  <input type="password" name="password" id="password" ng-model="password" required>
</form>
```
Let's look at the `loginForm.$error` object:
```javascript
// Note that, I ignored some values in the following objects

// If we input nothing for both fields
loginForm.$error = {
  "required": [{
    "$pristine": true,
    "$dirty": false,
    "$valid": false,
    "$invalid": true,
    "$name": "password",
    "$error": {
      "required": true
    },
    "$parsers": [],
    "$formatters": [],
    "$viewChangeListeners": [],
  }, {
    "$viewValue": "",
    "$pristine": false,
    "$dirty": true,
    "$valid": false,
    "$invalid": true,
    "$name": "email",
    "$error": {
      "required": true,
      "email": false
    },
    "$parsers": [],
    "$formatters": [],
    "$viewChangeListeners": [],
  }],
  "email": false
}

// If we input something but not a valid email in the email field
loginForm.$error = {
  "required": [{
    "$pristine": true,
    "$dirty": false,
    "$valid": false,
    "$invalid": true,
    "$name": "password",
    "$error": {
      "required": true
    },
    "$parsers": [],
    "$formatters": [],
    "$viewChangeListeners": [],
  }],
  "email": [{
    "$viewValue": "invalid email",
    "$pristine": false,
    "$dirty": true,
    "$valid": false,
    "$invalid": true,
    "$name": "email",
    "$error": {
      "required": false,
      "email": true
    },
    "$parsers": [],
    "$formatters": [],
    "$viewChangeListeners": [],
  }]
}

// If we input valid values for both
loginForm.$error = {
  "required": false,
  "email": false
}
```

## CSS classes applied on form fields by Angular

As you read the last section: `Control Variables in Forms`, it's easy to understand the classes:
```css
.ng-pristine {}
.ng-dirty {}
.ng-valid {}
.ng-invalid {}
```
Depend on status of input field, these classes will be applied to the field in real-time.

## Custom validation

> When we user interacts with the controller from the page, for instance we input username and password, `$setViewValue()` method has been called on the `ngModelController`. It will update the `$viewValue`, then pass this value through each of the functions in `$parsers`, which includes any validators. The value that comes out of this `$parsers` pipeline be applied to `$modelValue` and the expression specified in the ng-model attribute.

### $parsers

The functions in `$parsers` have the opportunity to convert the value and change the validity state of the control by using the `$setValidity()` functions.  
So, using the `$parsers` array is one way we can create a custom validation.

Now, suppose that we have a user registry form, we want to check if the username is available (the input username isn't registered).

`patrick` is an invalid username. If we input it, username field will be invalid, so marked with red background color.

[Live demo here](./examples/form_validation_parsers.html)
```html
<form name="registryForm" novalidate>
  <label name="username">Your username</label>
  <input type="text" name="username" ng-model="username" placeholder="Your username" available-username/>
</form>
```

```css
input.ng-invalid {
  background-color: red;
}
```

```javascript
'use strict';
angular.module('demoApp', [])
  .value('username', {
    'patrick': {
      'gender': 'M',
      'avatar': 'idenicon.png'
    }
  })
  .directive('availableUsername', ['username', function(username) {
    return {
      require: '?ngModel',
      link: function(scope, iElement, iAttrs, ngModel) {
        if (!ngModel) { return; }
        ngModel.$parsers.unshift(function(viewValue) {
          if (username[viewValue]) {
            // Invalid
            ngModel.$setValidity('availableUsername', false);
            return undefined;

          } else {
            ngModel.$setValidity('availableUsername', true);
            return viewValue;
          }
        });
      }
    };
  }]);
```

### $formatters

Whenever the model value changes, the value will be passed to `$formatters` functions one by one. Then display on the page.
For the demo above, we want to format the input username to lowercase. So we can do this way:

[Live demo here](./examples/form_validation_formatters.html)
```javascript
'use strict';
angular.module('demoApp', [])
  .directive('lowercase', ['$filter', function($filter) {
    return {
      require: '?ngModel',
      link: function(scope, iElement, iAttrs, ngModel) {
        if (!ngModel) { return; }
        ngModel.$formatters.unshift(function(viewValue) {
          return $filter('lowercase')(viewValue);
        });
      }
    };
  }]);
```

(END)
