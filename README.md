> **>>> TL;DR:** This provides a minimal vanilla JS base class that aims to reduce the complexity of creating reactive custom elements. See the [Quick Start Example](#quick-start-example)

Web Component Base
---
[![Package information: NPM version](https://img.shields.io/npm/v/web-component-base)](https://www.npmjs.com/package/web-component-base)
[![Package information: NPM license](https://img.shields.io/npm/l/web-component-base)](https://www.npmjs.com/package/web-component-base)
[![Package information: NPM downloads](https://img.shields.io/npm/dt/web-component-base)](https://www.npmjs.com/package/web-component-base)


When you extend the `WebComponent` class for your component, you only have to define the `template` and `properties`. Any change in any property value will automatically cause just the component UI to render.

The result is a reactive UI on property changes.

## Table of Contents
1. [Import via unpkg](#import-via-unpkg)
1. [Installation via npm](#installation-via-npm)
1. [Usage](#usage)
1. [`template` vs `render()`](#template-vs-render)
1. [Prop access](#prop-access)
1. [Quick Start Example](#quick-start-example)
1. [Life-Cycle Hooks](#life-cycle-hooks)
    1. [`onInit`](#oninit) - the component is connected to the DOM, before view is initialized
    1. [`afterViewInit`](#afterviewinit) - after the view is first initialized
    1. [`onDestroy`](#ondestroy) - the component is disconnected from the DOM
    1. [`onChanges`](#onchanges) - every time an attribute value changes


## Import via unpkg
Import using [unpkg](https://unpkg.com/web-component-base) in your vanilla JS component. We will use this in the rest of our [usage examples](#usage).

```js
import WebComponent from "https://unpkg.com/web-component-base/index.js";
```

## Installation via npm
Usable for projects using typescript, or with bundlers, or using import maps.

```bash
npm i web-component-base
```

## Usage

In your component class:

```js
// HelloWorld.mjs
import WebComponent from "https://unpkg.com/web-component-base/index.js";

class HelloWorld extends WebComponent {
  static properties = ["data-name", "emotion"];

  get template() {
    return `
        <h1>Hello ${this.props.dataName}${this.props.emotion === "sad" ? ". 😭" : "! 🙌"}</h1>`;
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
  <hello-world name="Ayo" emotion="sad">
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

There is a `WebComponent.props` read-only property provided for easy access to *any* observed attribute. This works like [`HTMLElement.dataset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) except `dataset` is only for attributes prefixed with `data-*`.

A camelCase counterpart using `props` will give read/write access to any attribute, with or without the `data-*` prefix.

You can access attribute properties in two ways:
1. Use the camelCase counterpart: `this.props.myProp`, which is automatically filled.
1. Or stick with kebab-case: `this["my-prop"]`

```js
class HelloWorld extends WebComponent {
  static properties = ["my-prop"];

  get template() {
    return `
        <h1>Hello ${this.props.myProp}</h1>
        <h2>Hello ${this["my-prop"]}</h2>
    `;
  }
}
```

## Quick Start Example

Here is an example of using a custom element in a single .html file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WC Base Test</title>
    <script type="module">
      import WebComponent from "https://unpkg.com/web-component-base/index.js";
      class HelloWorld extends WebComponent {
        static properties = ["data-name"];

        get template() {
          return `<h1>Hello ${this.props.dataName ?? 'World'}!</h1>`;
        }
      }
      customElements.define("hello-world", HelloWorld);
    </script>
  </head>
  <body>
    <hello-world data-name="Ayo"></hello-world>
    <script>
        const helloWorld = document.querySelector('hello-world');
        setTimeout(() => {
            helloWorld.setAttribute('data-name', 'Ayo zzzZzzz');
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
import WebComponent from "https://unpkg.com/web-component-base/index.js";

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
import WebComponent from "https://unpkg.com/web-component-base/index.js";

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
import WebComponent from "https://unpkg.com/web-component-base/index.js";

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
