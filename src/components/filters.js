import {createElement} from "../util";
import Filter from "./filter";

export default class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `
      <section class="main__filter filter container">
        ${this._filters.map((filter) => Filter(filter)).join(``)}
      </section>
    `.trim();
  }
}
