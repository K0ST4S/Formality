## Introduction

`Formality` is a form builder built with Angular. It uses Angular's `ReactiveFormsModule` and [ng-bootstrap](https://ng-bootstrap.github.io/#/home) (Bootstrap 5). `Formality` supports a variety of control [Types](#types).

### Goals

- Improve scalability.
- Ease front-end developer workload if the form is dynamic, and its structure is defined in the backend. Unless a distinctive styling for a control is needed, there should be no additional effort needed to [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) a control in the front-end.
- Keep website forms' layout and styling consistent.
- Reuse the logic of rendering forms.
- Keep website modular by having forms rendering and forms' data seperate.

Additionaly, `FormalityUtils` class provides additional functions:

- Generate styling template for your unique form structure
- Object structure validity checking

> Note: `FormalityUtils` currently generates SCSS styling template only.

## Types

- `Text`
- `Password`
- `Email`
- `Number`
- `Search`
- `Mobile` - `tel` input type.
- `Url`
- `Textarea`
- `Article` - a rich [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) text editor that uses [ngx-quill](https://www.npmjs.com/package/ngx-quill) package.
- `Checkbox` - can be intermediate.
- `Switch` - same as `Checkbox` but displayed as switch. Cannot be intermediate.
- `Radio`
- `RadioGroup`
- `Range`
- `Date`
- `Select` - a drop down with several values. Can be single, or multi. It uses [ng-select](https://github.com/ng-select/ng-select) package.
- `Country` - a drop down with country name and their [flags](https://www.npmjs.com/package/flag-icon-css).
- `File`
- `Image`
- `Form` - used in order for controls to be grouped in the DOM tree, <b>and</b> to be grouped in Angular's `FormGroup`.
- `Group` - used in order for controls to be grouped in the DOM tree.

## Data structure

You may define the object as a `JSON`, `typescript` object, or receive it from the backend. The object is constrained by abstract `FormalityControl` type, which can be nested.
Additional constraints:

- A `Group` must have `controls` property and must not have `value` property.
- A `RadioGroup` must have both `value` and `controls` properties.
- All other controls, including FormGroup, must have `value` property and shouldn't have `controls` property.
- No identical parent and child name combinations within a form or within all active `Formality` forms.

Any `FormalityControl` value may be in form of a control or array of controls, including the base object, allowing you to wrap your form elements inside a single group or keep them seperate in the DOM tree.

## Form controls' classes

Formality creates a DOM tree with `css` selectors in a predictable manner:

- Form: `{control.name}-form form` class.
  - Controls: `{control.name}-controls controls` class.
    - Control: `{control.name}-control` class (also `{control.name}{parent.name}` id).
    - Label: `{control.name}-label` class.

You can use that to make unified style for your forms by selecting `subform` and `controls`, and/or make distinctive styles by selecting controls by their name.

`Formality` adds [is-valid, is-invalid](https://getbootstrap.com/docs/5.0/forms/validation/) classes according to control's validity.

## Usage

#### 1. Define your form.

`form1.json`:

```json
{
  "label": "Formality - optimise productivity!",
  "name": "baseGroup",
  "type": "group",
  "controls": [
    {
      "name": "yourAge",
      "label": "Whats your age",
      "value": "10",
      "type": "text",
      "validators": {
        "required": true,
        "minlength": 2
      }
    },
    {
      "name": "simpleSwitch",
      "label": "Do you like switches?",
      "value": false,
      "type": "switch",
      "validators": {
        "requiredTrue": true
      }
    }
  ]
}
```

#### 2. Pass the object to `FormalityComponent`.

> Give form an `id` if you're going to style multiple forms differently.

```html
<formality class="col-lg-6 col-12" id="test1" [formData]="form1"> </formality>
```

#### 3. Use `FormalityUtils` class to get `.scss` styling template.

```ts
console.log(FormalityUtils.generateScssSnippet(form1, SnippetType.Specific));
```

Copy and paste the code to `styles.scss` (or a file, included in `styles.scss` for better seperation). If you want to make sure styles for common selectors like `subform` and `controls` only impact this form - wrap it inside your `id`. In this case - it is `test1`. Format the snippet. Result:

```scss
#test1 {
  .baseGroupsubform {
    .baseGroupcontrols {
      .yourAge {
      }
      .simpleSwitch {
      }
    }
  }
}
```

Add styling as you see fit.

#### 4. Subscribe to form submittions.

```ts
  @ViewChild(FormalityComponent) form: FormalityComponent;

  form.onSubmitted.subscribe((value) => console.log(value));
```

#### 5. Introduce restrictions checking (Optional)

```ts
FormalityUtils.checkDataValidity(form1);
```

## Bootstrap integration improvement

A inconsistency within bootstrap is that for some control types bootstrap has the following layout:

<b>label</b>
<b>control</b>

but for other, such as a checkbox layout is reversed:

<b>control</b>
<b>label</b>

In ng-formality we render all controls using the latter, with the help of a [flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) and an [order](https://developer.mozilla.org/en-US/docs/Web/CSS/order) attribute when needed. That allows the code of `FormControlComponent` to be simpler. However, styling of valid/invalid control is missing for some control labels.
Thus, you should add the following code in `_forms.scss` of [ng-bootstrap](https://ng-bootstrap.github.io/#/home) file if you want all invalid control labels to be highlighted.

```scss
.form-control {
  @include form-validation-state-selector($state) {
    ~ .form-label {
      color: $color;
    }
  }
}
```

## FAQ

1. This library is tied to Bootstrap. Is it not going to make all my websites look the same?
   > No. There are many bootstrap theme collection websites available online. Make sure it is Bootstrap <b>5</b> and replace the style sheets to have completely different look with minimal effort.

## Future improvements

1. Support for [FormArray](https://angular.io/api/forms/FormArray).
2. Support prefilling image field.
3. Support mobile number input by displaying country's flag, country's mobile code dropdown next to an input field.
4. Seperate `date`, `time` and `datettime` types (or add options to existing control).
5. Extend `Select` types to be capable of holding a value different than its name.
6. Use [moment](https://www.npmjs.com/package/moment) to format date. Add ability to pass format.
7. Add range and select validity check in `FormalityUtils`.
8. Add ability to have a select with labels and values different from labels, just like with `RadioGroup` type.
9. Extend `FormalityUtils` to generate SASS template.
10. Option for an image to be displayed when uploaded.
11. Solve dependancy on [ngx-translate](https://www.npmjs.com/package/@ngx-translate/core).
12. Create a online tool for generating style sheet templates.
13. Perhaps remove `Radio` type because this type is certain by being in a `RadioGroup` type parent.
14. Perhaps implement lazy loading for `CountrySelect` type, as it will be more rarely used and requires loading countries flags.
15. Perhaps bootstrap control classes by Cascading Style Sheet's `@extend` keyword, instead of Angular's `[class]` binding would give more flexibility.
16. Perhaps add ability to pass `FormalityComponent` when generating stylesheet, in order to include its ID.

PRs are welcome!
