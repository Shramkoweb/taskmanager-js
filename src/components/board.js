import Task from "./task";
import TaskEdit from "./task-edit";
import LoadMoreButton from "./load-more-button";
import {createElement} from "../util";

export default class Board {
  constructor(tasks) {
    this._tasks = tasks;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    const getEditTaskTemplate = new TaskEdit(this._tasks[0]).getTemplate();
    const getTaskTemplate = this._tasks.map((task) => new Task(task).getTemplate()).join(``);
    return `
      <section class="board container">
        <div class="board__filter-list">
          <a href="#" class="board__filter">SORT BY DEFAULT</a>
          <a href="#" class="board__filter">SORT BY DATE up</a>
          <a href="#" class="board__filter">SORT BY DATE down</a>
        </div>
        
        <div class="board__tasks">
          ${getEditTaskTemplate}
          ${getTaskTemplate}
        </div>
        
        ${LoadMoreButton.getTemplate()}
      </section>
    `.trim();
  }
}
