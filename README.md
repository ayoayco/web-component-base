# Web Component Base

[![Package information: NPM version](https://img.shields.io/npm/v/web-component-base)](https://www.npmjs.com/package/web-component-base)
[![Package information: NPM license](https://img.shields.io/npm/l/web-component-base)](https://www.npmjs.com/package/web-component-base)
[![Package information: NPM downloads](https://img.shields.io/npm/dt/web-component-base)](https://www.npmjs.com/package/web-component-base)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/web-component-base)](https://bundlephobia.com/package/web-component-base)

🤷‍♂️ zero-dependency, 🤏 tiny JS base class for creating reactive custom elements easily ✨

When you extend the `WebComponent` class for your component, you only have to define the `template` and `properties`. Any change in any property value will automatically cause just the component UI to render.

The result is a reactive UI on property changes. [View on CodePen ↗](https://codepen.io/ayoayco-the-styleful/pen/ZEwoNOz?editors=1010)

## Features

- A robust `props` API that synchronizes your components' property values and HTML attributes
- Sensible life-cycle hooks that you understand and remember
- A minimal `html` function for tagged templates powered by preact's tiny (450 Bytes) [htm/mini](http://github.com/developit/htm)
- Attach "side effects" that gets triggered on property value changes with `attachEffect` ([example](https://codepen.io/ayoayco-the-styleful/pen/ExrdWPv?editors=1011))
- Provided out-of-the-box with [McFly](https://ayco.io/gh/McFly), a powerful no-framework framework

## Table of Contents

1. [Installation](#installation)
    1. [Import via unpkg](#import-via-unpkg)
    2. [Installation via npm](#installation-via-npm)
3. [Usage](#usage)
4. [`template` vs `render()`](#template-vs-render)
5. [Prop access](#prop-access)
    1. [Alternatives](#alternatives)
6. [Quick Start Example](#quick-start-example)
7. [Life-Cycle Hooks](#life-cycle-hooks)
    1. [`onInit`](#oninit) - the component is connected to the DOM, before view is initialized
    2. [`afterViewInit`](#afterviewinit) - after the view is first initialized
    3. [`onDestroy`](#ondestroy) - the component is disconnected from the DOM
    4. [`onChanges`](#onchanges) - every time an attribute value changes
8. [Library Size](#library-size)


## Installation

The library is distributed as complete ESM modules, published on [NPM](https://ayco.io/n/web-component-base). Please file an issue in our [issue tracker](https://ayco.io/gh/web-component-base/issues) for problems or requests regarding our distribution.

### Import via unpkg (no bundlers needed!)
Import using [unpkg](https://unpkg.com/web-component-base) in your vanilla JS component. We will use this in the rest of our [usage examples](#usage).

Please check

```js
import { WebComponent } from "https://unpkg.com/web-component-base@latest/index.js";
```

### Installation via npm
Usable for projects with bundlers or using import maps pointing to to the specific files in downloaded in your `node_modules/web-component-base`.

```bash
npm i web-component-base
```

## Usage

In your component class:

```js
// HelloWorld.mjs
import { WebComponent } from "https://unpkg.com/web-component-base@latest/index.js";

class HelloWorld extends WebComponent {
  static props ={
    myName: 'World',
    emotion: 'sad'
  }
  get template() {
    return `
      <h1>Hello ${this.props.myName}${this.props.emotion === "sad" ? ". 😭" : "! 🙌"}</h1>
    `;
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
1. You can *optionally* call this `render()` method at any point to trigger a render if you need (eg, if you have private unobserved properties that need to manually trigger a render)
1. Overriding the `render()` function for handling a custom `template`--where you can return `string | Node | (string | Node)[]` is also an option. More examples on this to follow.

## Prop Access

 The `props` property of the `WebComponent` interface is provided for easy read/write access to a camelCase counterpart of *any* observed attribute.

```js
class HelloWorld extends WebComponent {
  static props = {
    myProp: 'World'
  }
  get template() {
    return html`
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

Therefore, this will tell the browser that the UI needs a render if the attribute is one of the component's observed attributes we explicitly provided with `static props`;

> [!NOTE]
> The `props` property of `WebComponent` works like `HTMLElement.dataset`, except `dataset` is only for attributes prefixed with `data-`. A camelCase counterpart using `props` will give read/write access to any attribute, with or without the `data-` prefix.
> Another advantage over `HTMLElement.dataset` is that `WebComponent.props` can hold primitive types 'number', 'boolean', 'object' and 'string'.

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
      import { WebComponent } from "https://unpkg.com/web-component-base@latest/index.js";

      class HelloWorld extends WebComponent {
        static props = {
          myName: 'World'
        }
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
import { WebComponent } from "https://unpkg.com/web-component-base@latest/index.js";

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
import { WebComponent } from "https://unpkg.com/web-component-base@latest/index.js";

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
import { WebComponent } from "https://unpkg.com/web-component-base@latest/index.js";

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

All the functions and the base class in the library are minimalist by design and only contains what is needed for their purpose.

As of v2.0.0, the main export (with `WebComponent` + `html` + `attachEffect`) is 1.7 kB (min + gzip) according to [bundlephobia.com](https://bundlephobia.com/package/web-component-base@2.0.0), and the `WebComponent` base class is just 1.1 kB (min + brotli) according to [size-limit](http://github.com/ai/size-limit).

There is an increase in size compared to that of before this release, primarily because of advanced features (e.g., effects, html tagged templates, and props blueprints) in building complex applications.

> [!NOTE]
> As a builder of both simple sites and complex web apps, I recognize that not all custom elements need advanced features for reactivity.
>
>I also don't want to get things in my code that I don't need (YAGNI -- You Aren't Gonna Need It)... and I want a base class for simpler use cases that don't have Proxy props or attaching effects...
>
>To address this, I am working on a "lite" version of my base class here... please stay tuned.
>
> -Ayo