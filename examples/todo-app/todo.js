import { WebComponent, html } from "../../src/index.js";

class TodoApp extends WebComponent {
  #tasks = [];
  addTask() {
    const newTask = this.querySelector("#task-field")?.value;
    if (newTask) {
      this.#tasks.push(newTask);
      console.log(this.#tasks);
      // manual render because #tasks is private + unobserved
      this.render();
    }
  }
  #existingTimer;
  removeTask(index, checkbox) {
    clearTimeout(this.#existingTimer);
    // users can change their mind within 1 second :)
    this.#existingTimer = setTimeout(() => {
      if (checkbox.checked) {
        this.#tasks.splice(index, 1);
        this.render();
      }
    }, 1000);
  }
  get template() {
    return html`
      <form
        onSubmit=${(e) => {
          e.preventDefault();
          this.addTask();
        }}
      >
        <input placeholder="Buy milk" id="task-field" name="task-field" />
        <button type="submit">Add</button>
      </form>
      <ul style="list-style:none">
        ${this.#tasks.map(
          (t, i) => html`
            <li>
              <input
                type="checkbox"
                name="task-${i}"
                id="task-${i}"
                onChange=${(e) => this.removeTask(i, e.target)}
                style="cursor:pointer"
              />
              <label for="task-${i}" style="cursor:pointer">${t}</label>
            </li>
          `
        )}
      </ul>
      <footer>just to make it more difficult</footer>
    `;
  }
}

customElements.define("todo-app", TodoApp);
