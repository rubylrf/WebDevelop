# ngAnimate

We use CSS3 Transitions for spec item changes here.

```html
<div ng-class="{ swipe: 1, 'item-change': isItemChanged }"></div>
```

Use our custom css class `item-change` with ng directive `ngClass`.  
When spec item changes, we set the `isItemChanged` to `true`, so `item-change` css class is added.  
After 1.5s, we remove this css class.

ngAnimate will generate some css classnames during the animate.

classname                  | when
-------------------------- | -------------
.item-change-add           | When `isItemChanged` evaluate to true, but before `.item-change` class added
.item-change-add-active    | After `.item-change` added
.item-change-remove        | When `isItemChanged` evaluate to true, but before `.item-change` class removed
.item-change-remove-active | After `.item-change` removed

