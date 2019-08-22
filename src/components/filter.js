import {createElement} from "../util";

export class Filter {
  constructor({title, count}) {
    this.title = title;
    this.count = count;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `
      <input type="radio" id="filter__${this.title}" class="filter__input visually-hidden" name="filter"
        ${this.count === 0 ? `disabled` : ``}
        ${this.title === `all` ? `checked` : ``}
      />
      <label for="filter__${this.title}" class="filter__label">
        ${this.title} <span class="filter__${this.title}-count">${this.count}</span>
      </label>
    `.trim();
  }
}
