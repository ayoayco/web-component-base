import { WebComponent } from "../../src/WebComponent.js";

export class ObjectText extends WebComponent {
  // static properties = ["object"];
  static props = {
    object: {
      hello: 'worldzz',
      age: 2
    }
  }
  onChanges() {
    console.log('>>> object', this.props.object)
  }
  get template() {
    const greeting = document.createElement('textarea')
    greeting.innerHTML = this.props.object.hello;
    greeting.setAttribute('id', 'greeting-field');
    const greetingLabel = document.createElement('label');
    greetingLabel.setAttribute('for', 'greeting-field');
    greetingLabel.textContent = 'Hello';
    greeting.onkeyup = () => {
      this.props.object = {
        ...this.props.object,
        hello: greeting.value
      };
    }
    const ageField = document.createElement('input');
    ageField.value = this.props.object.age;
    ageField.setAttribute('id', 'age-field');
    const ageLabel = document.createElement('label')
    ageLabel.setAttribute('for', 'age-field');
    ageLabel.textContent = 'Age'
    ageField.onkeyup = () => {
      this.props.object = {
        ...this.props.object,
        age: ageField.value
      }
    }
    const form = document.createElement('form');
    form.append(greetingLabel, greeting, ageLabel, ageField)
    return form;
  }

  render() {
    if (this.children.length === 0) this.replaceChildren(this.template);
  }
}

customElements.define("my-object", ObjectText);
