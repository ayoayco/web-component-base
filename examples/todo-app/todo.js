import { WebComponent, html } from "../../src/index.js";

class TodoApp extends WebComponent {
  #tasks = [];
  get form() {
    return this.querySelector("form");
  }
  get newTask() {
    /**
     * @type {HTMLInputElement | null}
     */
    const el = this.querySelector("#task-field");
    const value = el?.value;
    this.form?.reset();
    return value;
  }
  addTask() {
    this.#tasks.push(this.newTask);
    // manual render because #tasks is private + unobserved
    this.render();
  }
  get template() {
    return html`
      <form onSubmit=${(e) => e.preventDefault()}>
        <input placeholder="New task here..." id="task-field" />
        <button type="button" onClick=${() => this.addTask()}>Add</button>
      </form>
      <ul>
        ${this.#tasks.map((t) => html`<li>${t}</li>`)}
      </ul>
    `;
  }
}

customElements.define("todo-app", TodoApp);
