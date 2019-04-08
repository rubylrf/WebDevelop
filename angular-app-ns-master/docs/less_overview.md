# LESS overview

LessCss is a CSS pre-processor, meaning that it extends the CSS language, adding features that allow variables, mixins, functions and many other techniques that allow you to make CSS that is more maintainable, themable and extendable.

Language features quick preview:

## Variables
Control commonly used values in a single location.
It's not uncommon to see the same value repeated dozens if not hundreds of times across your stylesheets:

For example:

```css
@deepRed: #a80104;
@brightRed: #d70006;
h1 {
  background: @deepRed;
  padding: 15px 20px;
}
.subBar {
  background: @brightRed;
  color: #fff;
}
```

Outputs:

```css
h1 {
  background: #a80104;
  padding: 15px 20px;
}
.subBar {
  background: #d70006
  color:#fff;
}
```

## Mixins

Mixins can also take arguments, which are variables pass to the block of selectors when it is mixed in.

For example:

```css
.rounded-corners (@radius:1px) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  -ms-border-radius: @radius;
  -o-border-radius: @radius;
  border-radius: @radius;
}
input {
  .rounded-corners;
}
button {
  .rounded-corners(3px);
}
```
Outputs:

```css
input {
  -webkit-border-radius: 1px;
  -moz-border-radius: 1px;
  -ms-border-radius: 1px;
  -o-border-radius: 1px;
  border-radius: 1px;
}
button {
  webkit-border-radius: 1px;
  -moz-border-radius: 1px;
  -ms-border-radius: 1px;
  -o-border-radius: 1px;
  border-radius: 1px;
}
```

## Nesting

We can be nested in a selector another selector to implementation inheritance, this greatly reduced the amount of code, and the code looks more clear.

For example:

```css
.swipe {
  height: 60px;
  border-bottom: 1px solid #ccc;
  padding-left: 45px;
  .title {
    color: #333;
    padding-top: 10px;
    height: 40px;
  }
  .value {
    padding-top: 15px;
    padding-right: 10px;
    .lastDay {
      color: #fff;
    }
  }
}
```

Outputs:

```css
.swipe {
  height: 60px;
  border-bottom: 1px solid #ccc;
  padding-left: 45px;
}
.swipe .title {
  color: #333;
  padding-top: 10px;
  height: 40px;
}
.swipe .value {
  padding-top: 15px;
  padding-right: 10px;
}
.swipe .value .lastDay {
  color: #fff;
}
```

In the furture we can use more of method .such as `function` and `merge`.
