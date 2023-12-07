import { WebComponent } from "../../src/WebComponent.js";

export class ObjectText extends WebComponent {
  static properties = ["object"];
  onInit() {
    this.props.object = {
        hello: 'world',
        age: 2
    };
  }
  onChanges() {
    console.log('>>> object', this.props.object)
  }
  get template() {
    return `<textarea>${JSON.stringify(this.props.object)}</textarea>`;
  }
}

customElements.define("my-object", ObjectText);
