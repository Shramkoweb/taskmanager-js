import {createElement} from "../util";

export default class Filter {
  constructor({title, count}) {
    this._title = title;
    this._count = count;
    this._element = null;

  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `
      <input type="radio" id="filter__${this._title}" class="filter__input visually-hidden" name="filter"
        ${this._count === 0 ? `disabled` : ``}
        ${this._title === `all` ? `checked` : ``}
      />
      <label for="filter__${this._title}" class="filter__label">
        ${this._title} <span class="filter__${this._title}-count">${this._count}</span>
      </label>
    `.trim();
  }
}
