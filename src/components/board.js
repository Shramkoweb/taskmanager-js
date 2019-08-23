import Task, {getCard} from "./task";
import TaskEdit, {getCardEdit} from "./task-edit";
import {getLoadMoreButton} from "./load-more-button";
import {createElement} from "../util";

/*/!* Ф-я гереации карточек *!/
export const getBoardCards = (cards) => {
  return cards.map((card) => getCard(card)).join(``);
};

/!* Ф-я генерации разметки борда для карточек *!/
export const getBoard = (cards) => {
  return `

  `.trim();
};*/

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
        
        ${getLoadMoreButton()}
      </section>
    `.trim();
  }
}
