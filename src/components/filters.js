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
    const filterTemplates = this._filters
      .map((filter) => new Filter(filter))
      .map((instance) => instance.getTemplate())
      .join(``);

    return `
      <section class="main__filter filter container">
        ${filterTemplates}
      </section>
    `.trim();
  }
}
