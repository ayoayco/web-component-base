# Web Component Base

[![Package information: NPM version](https://img.shields.io/npm/v/web-component-base)](https://www.npmjs.com/package/web-component-base)
[![Package information: NPM license](https://img.shields.io/npm/l/web-component-base)](https://www.npmjs.com/package/web-component-base)
[![Package information: NPM downloads](https://img.shields.io/npm/dt/web-component-base)](https://www.npmjs.com/package/web-component-base)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/web-component-base)](https://bundlephobia.com/package/web-component-base)

> A zero-dependency, ~600 Bytes (minified & gzipped), JS base class for creating reactive custom elements easily

When you extend the `WebComponent` class for your component, you only have to define the `template` and `properties`. Any change in any property value will automatically cause just the component UI to render.

The result is a reactive UI on property changes. [View on CodePen ↗](https://codepen.io/ayoayco-the-styleful/pen/ZEwoNOz?editors=1010)

<details>
<summary>Table of Contents</summary>
<ol>
  <li><a href="#import-via-unpkg">Import via unpkg</a></li>
  <li><a href="#installation-via-npm">Installation via npm</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#template-vs-render">`template` vs `render()`</a></li>
  <li><a href="#prop-access">Prop access</a>
    <ol>
      <li><a href="#alternatives">Alternatives</a></li>
    </ol>
  </li>
  <li><a href="#quick-start-example">Quick Start Example</a></li>
  <li><a href="#life-cycle-hooks">Life-Cycle Hooks</a>
    <ol>
      <li><a href="#oninit">`onInit`</a> - the component is connected to the DOM, before view is initialized</li>
      <li><a href="#afterviewinit">`afterViewInit`</a> - after the view is first initialized</li>
      <li><a href="#ondestroy">`onDestroy`</a> - the component is disconnected from the DOM</li>
      <li><a href="#onchanges">`onChanges`</a> - every time an attribute value changes</li>
    </ol>
  </li>
  <li><a href="#library-size">Library Size</a></li>
</ol>
</details>

## Import via unpkg
Import using [unpkg](https://unpkg.com/web-component-base) in your vanilla JS component. We will use this in the rest of our [usage examples](#usage).

```js
import WebComponent from "https://unpkg.com/web-component-base@latest/WebComponent.min.js";
```

## Installation via npm
Usable for projects with bundlers or using import maps.

```bash
npm i web-component-base
```

## Usage

In your component class:

```js
// HelloWorld.mjs
import WebComponent from "https://unpkg.com/web-component-base@latest/WebComponent.min.js";

class HelloWorld extends WebComponent {
  static properties = ["my-name", "emotion"];
  get template() {
    return `
        <h1>Hello ${this.props.myName}${this.props.emotion === "sad" ? ". 😭" : "! 🙌"}</h1>`;
  }
}

customElements.define('hello-world', HelloWorld);
```


In your HTML page:

```html
<head>
  <script type="module" src="HelloWorld.mjs"></script>
</head>
<body>
  <hello-world my-name="Ayo" emotion="sad">
  <script>
      const helloWorld = document.querySelector('hello-world');

      setTimeout(() => {
        helloWorld.setAttribute('emotion', 'excited');
      }, 2500)
  </script>
</body>
```

The result is a reactive UI that updates on attribute changes:

<img alt="UI showing feeling toward Web Components changing from SAD to EXCITED" src="https://git.sr.ht/~ayoayco/web-component-base/blob/main/assets/wc-base-demo.gif" width="400" />

## `template` vs `render()`

This mental model attempts to reduce the cognitive complexity of authoring components:

1. The `template` is a read-only property (initialized with a `get` keyword) that represents *how* the component view is rendered.
1. There is a `render()` method that triggers a view render.
1. This `render()` method is *automatically* called under the hood every time an attribute value changed.
1. You can *optionally* call this `render()` method at any point to trigger a render if you need.

## Prop Access

 The `props` property of the `WebComponent` interface is provided for easy read/write access to a camelCase counterpart of *any* observed attribute.

```js
class HelloWorld extends WebComponent {
  static properties = ["my-prop"];
  onInit() {
    let count = 0;
    this.onclick = () => this.props.myProp = `${++count}`
  }
  get template() {
    return `
        <h1>Hello ${this.props.myProp}</h1>
    `;
  }
}
```

Assigning a value to the `props.camelCase` counterpart of an observed attribute will trigger an "attribute change" hook.

For example, assigning a value like so:
```
this.props.myName = 'hello'
```

...is like calling the following:
```
this.setAttribute('my-name','hello');
```

Therefore, this will tell the browser that the UI needs a render if the attribute is one of the component's observed attributes we explicitly provided with `static properties = ['my-name']`;

> The `props` property of `WebComponent` works like `HTMLElement.dataset`, except `dataset` is only for attributes prefixed with `data-`. A camelCase counterpart using `props` will give read/write access to any attribute, with or without the `data-` prefix.
> However, note that like `HTMLElement.dataset`, values assigned to properties using `WebComponent.props` is always converted into string. This will be improved in later versions.

### Alternatives

The current alternatives are using what `HTMLElement` provides out-of-the-box, which are:
1. `HTMLElement.dataset` for attributes prefixed with `data-*`. Read more about this [on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset).
1. Methods for reading/writing attribute values: `setAttribute(...)` and `getAttribute(...)`; note that managing the attribute names as strings can be difficult as the code grows.

## Quick Start Example

Here is an example of using a custom element in a single .html file. 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>WC Base Test</title>
    <script type="module">
      import WebComponent from "https://unpkg.com/web-component-base@latest/WebComponent.min.js";

      class HelloWorld extends WebComponent {
        static properties = ["my-name"];
        get template() {
          return `<h1>Hello ${this.props.myName}!</h1>`;
        }
      }

      customElements.define("hello-world", HelloWorld);
    </script>
  </head>
  <body>
    <hello-world my-name="Ayo"></hello-world>
    <script>
        const helloWorld = document.querySelector('hello-world');
        setTimeout(() => {
            helloWorld.props.myName = 'Ayo zzzZzzz';
        }, 2500);
    </script>
  </body>
</html>
```

## Life-Cycle Hooks

Define behavior when certain events in the component's life cycle is triggered by providing hook methods

### onInit()
- Triggered when the component is connected to the DOM
- Best for setting up the component

```js
import WebComponent from "https://unpkg.com/web-component-base@latest/WebComponent.min.js";

class ClickableText extends WebComponent {
  // gets called when the component is used in an HTML document
  onInit() {
    this.onclick = () => console.log(">>> click!");
  }

  get template() {
    return `<span style="cursor:pointer">Click me!</span>`;
  }
}
```

### afterViewInit()
- Triggered after the view is first initialized


```js
class ClickableText extends WebComponent {
  // gets called when the component's innerHTML is first filled
  afterViewInit() {
    const footer = this.querySelector('footer');
    // do stuff to footer after view is initialized
  }

  get template() {
    return `<footer>Awesome site &copy; 2023</footer>`;
  }
}
```

### onDestroy()
- Triggered when the component is disconnected from the DOM
- best for undoing any setup done in `onInit()`

```js
import WebComponent from "https://unpkg.com/web-component-base@latest/WebComponent.min.js";

class ClickableText extends WebComponent {
 
  clickCallback() {
    console.log(">>> click!");
  }

  onInit() {
    this.onclick = this.clickCallback;
  }

  onDestroy() {
    console.log(">>> removing event listener");
    this.removeEventListener("click", this.clickCallback);
  }

  get template() {
    return `<span style="cursor:pointer">Click me!</span>`;
  }
}
```

### onChanges()
- Triggered when an attribute value changed

```js
import WebComponent from "https://unpkg.com/web-component-base@latest/WebComponent.min.js";

class ClickableText extends WebComponent {
  // gets called when an attribute value changes
  onChanges(changes) {
      const {property, previousValue, currentValue} = changes;
      console.log('>>> ', {property, previousValue, currentValue})
  }

  get template() {
    return `<span style="cursor:pointer">Click me!</span>`;
  }
}
```

## Library Size 

The bundle size was reported to be 587 Bytes (minified & gzipped) by [bundlephobia](https://bundlephobia.com/package/web-component-base). Running [size-limit](https://npmjs.com/package/@size-limit/preset-small-lib) reports the base class size as around 760 Bytes (minified & brotlied), and using the `WebComponent.min.js` version gets it down to around 400 Bytes.