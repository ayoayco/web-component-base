> **>>> TLDR;** See the [Quick Start Example](#quick-start-example) you can just copy, refactor, and modify

Web Component Base
---
[![Package information: NPM version](https://img.shields.io/npm/v/web-component-base)](https://www.npmjs.com/package/web-component-base)
[![Package information: NPM license](https://img.shields.io/npm/l/web-component-base)](https://www.npmjs.com/package/web-component-base)
[![Package information: NPM downloads](https://img.shields.io/npm/dt/web-component-base)](https://www.npmjs.com/package/web-component-base)

This provides a very minimal base class for creating reactive custom elements easily.

When you extend the `WebComponent` class for your component, you only have to define the `template` and `properties`. Any change in any property value will automatically cause just the component UI to render.

The result is a reactive UI on property changes.

## Table of Contents
1. [Import via unpkg](#import-via-unpkg)
1. ~~[Installation via npm](#installation-via-npm)~~ - in-progress
1. [Usage](#usage)
1. [Quick Start Example](#quick-start-example)
1. [Life-Cycle Hooks](#life-cycle-hooks)
    1. [`onInit`](#oninit) - the component is connected to the DOM, before view is initialized
    1. [`afterViewInit`](#afterviewinit) - after the view is first initialized
    1. [`onChanges`](#onchanges) - every time an attribute value changes

## Import via unpkg
Import using [unpkg](https://unpkg.com/web-component-base) in your component. We will use this in the rest of our [usage examples](#usage).

```js
import WebComponent from "https://unpkg.com/web-component-base";

// or a specific version
import WebComponent from "https://unpkg.com/web-component-base@1.6.0/index.mjs";
```

## ~~Installation via npm~~ - in-progress
Still fixing the module for this to be used as a node module

<!--```bash
npm i web-component-base
```-->

## Usage

In your component class:

```js
// HelloWorld.mjs
import WebComponent from "https://unpkg.com/web-component-base";

class HelloWorld extends WebComponent {
  name = "World";
  emotion = "excited";

  static properties = ["name", "emotion"];

  get template() {
    return `
        <h1>Hello ${this.name}${this.emotion === "sad" ? ". 😭" : "! 🙌"}</h1>`;
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

      // import from unpkg
      import WebComponent from "https://unpkg.com/web-component-base";

      class HelloWorld extends WebComponent {
        static properties = ["name"];

        get template() {
          return `<h1>Hello ${this.name || 'World'}!</h1>`;
        }
      }

      customElements.define("hello-world", HelloWorld);

    </script>
  </head>
  <body>
    <hello-world name="Ayo"></hello-world>
    <script>
        const helloWorld = document.querySelector('hello-world');
        setTimeout(() => {
            helloWorld.setAttribute('name', 'Ayo zzzZzzz');
        }, 2500);
    </script>
  </body>
</html>
```

## Life-Cycle Hooks

Define behavior when certain events in the component's life cycle is triggered by providing hook methods

### onInit()
- triggered when the component is connected to the DOM
- best for setting up the component

```js
import WebComponent from "https://unpkg.com/web-component-base";

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
- triggered after the view is first initialized

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

### onChanges()
- triggered when an attribute value changed

```js
import WebComponent from "https://unpkg.com/web-component-base";

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
