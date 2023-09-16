// @ts-check
import { WebComponent } from "./WebComponent.mjs";
const  emotionPostfix = {
    excited: "!",
    sad: " :(",
  };
const emotionColor = {
    excited: "green",
    sad: "red",
  };

/**
 * Component to greet a person
 *  and display sentiment toward web components
 */
export class HelloWorld extends WebComponent {
  name = "World";
  emotion = "excited";


  static get observedAttributes() {
    return ["name", "emotion"];
  }

  get template() {
    return `
        <h1>Hello ${this.name}${emotionPostfix[this.emotion]}</h1>
        <h2>How do you feel about web components:
            <span style="color:${emotionColor[this.emotion]}">
                ${this.emotion.toUpperCase()}
            </span>
        </h2>`;
  }
}
