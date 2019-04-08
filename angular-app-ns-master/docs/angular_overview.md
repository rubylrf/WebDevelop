# AngularJS Overview

As you know, [Angularjs](https://angularjs.org/) is first written by **Google** under [MIT license](http://en.wikipedia.org/wiki/MIT_License). From then on, hundreds of developers(about 900 till now) contributed to this project. Angularjs is supported by Google organization, so you don't be afraid that it will be abandoned tomorrow.

## Two-way data binding

This is the coolest feature. We may write less and do more. So we can save much time.  
By the statistics, **80%** code of a web application are  DOM manipulation and event listenters.  
For example:
```javascript
function filter(event) {
  var $body = $("body"),
    classNames = event.data, // Array
    isIncompleted = (classNames[0] === "NEW"),
    selector = classNames.length === 1 ? "." + classNames[0] : "." + classNames.join(",.");

  $body.addClass("ui-disabled");
  $.mobile.loading("show");

  if (!$(selector).length) {
    switch (classNames[0]) {
    case "FLAGGED":
      popupErrorMessage("No FLAGGED ITEMS!");
      break;
    case "ESCALATED":
      popupErrorMessage("No ESCALATED ITEMS!");
      break;
    case "NEW":
      popupErrorMessage("NO INCOMPLETED ITEMS!");
      break;
    default:
      popupErrorMessage("NO ITEMS!");
    }

    $body.removeClass('ui-disabled');
    $.mobile.loading('hide');

  } else {
    $list
      .detach()
      .find(".subBar")
        .each(function() {
          var $this = $(this);

          if ($this
              .next(".content")
                .find("li")
                  .show()
                  .not(selector)
                    .hide()
                    .end()
                  .filter(selector)
                    .length) {

            if (isIncompleted) {
              collapseSection($this);

            } else {
              expandSection($this);
            }

          } else {
            collapseSection($this);
            $this.hide();
          }
        })
      .end()
    .insertBefore($executionPanel);

    initPopup();
    $body.removeClass("ui-disabled");
    $.mobile.loading("hide");
  }
}
```
Most code of this function are DOM manipulations. Angularjs offer us a way to sync between view and model, we don't need to pay much attention on these manipulations. We can focus on our applications.  

If we use Angularjs to implement this function, the code may look like:  
```html
<ul>
  <li ng-repeat="item in items | filter: className">
    {{item.title}}
  </li>
</ul>
```
When we change the `className` on `$scope` in controller, Angularjs take responsibility for update the DOM.

So what's the differences here?  
Before, when model change, we have to update DOM manually.  
Now, we update the model, and Angular update the DOM for us.

On the other hand, when DOM changes, it also reflect in model.

## Template

Template in Angular is just an HTML file. The HTML has been extended, contains mapping between model and view.  
:warning: Angular treat template as DOM not a string.  
```html
<ol>
  <li ng-repeat="log in logs">
    {{log.title}} changed to {{log.changedValue} @ {{log.timestamp | date}} by {{log.user}}
  </li>
</ol>
```

## MVC

Angular follow basic [MVC](http://en.wikipedia.org/wiki/Model-view-controller) principles. But it's more like [MVVM](http://en.wikipedia.org/wiki/MVVM).

`Model` is data of application.  
`ViewModel` in Angular is `$scope` object. It's bound to view for maintaining it.  
`Controller` is to init `$scope`.  
`View` is rendered HTML.

## Dependency Injection (DI)

[Dependency Injection (DI)](http://en.wikipedia.org/wiki/Dependency_injection) is a software design pattern that deals with how components get hold of their dependencies.

## Directives

Angular uses directives to extend the ability of HTML. For example:  
```html
<form name="registryForm" novalidate ng-app="demoApp">
  <input type="text" name="username" ng-model="username" placeholder="Your username" lowercase/>
</form>
<dialog>Hello world!</dialog>
```
`ng-app` , `ng-model` , `lowercase` , `dialog` are all directives.

## Unit testing

Because we put modules together by **Dependency Injection**, so it's easy for writing unit tests.
