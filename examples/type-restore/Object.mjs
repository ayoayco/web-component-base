import WebComponent from "../../src/WebComponent.js";

export class ObjectText extends WebComponent {
  static properties = ["object"];
  onInit() {
    this.props.object = {
        hello: 'world'
    };
  }
  get template() {
    return `<textarea>${this.props.object}</textarea>`;
  }
}

customElements.define("my-object", ObjectText);
