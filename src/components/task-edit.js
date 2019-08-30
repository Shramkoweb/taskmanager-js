import {createElement} from "../util";

const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

export default class TaskEdit {
  constructor({description, dueDate, tags, color, repeatingDays, id}) {
    this._description = description;
    this._id = id;
    this._dueDate = dueDate;
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._element = null;
  }

  removeElement() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    const isTaskRepeating = Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]);
    const getRepeatDaysTemplate = Object.keys(this._repeatingDays)
      .map((day) => {
        return `
          <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${day}-${this._id}" name="repeat" value="${day}" ${this._repeatingDays[day] ? `checked` : ``}/>
          <label class="card__repeat-day" for="repeat-${day}-${this._id}">${day}</label>
        `.trim();
      }).join(``);
    const getColorControlsTemplate = () => {
      return COLORS.map((color) => {
        return `
          <input type="radio" id="color-${color}-${this._id}" class="card__color-input card__color-input--${color} visually-hidden" name="color" value="${color}"
            ${this._color === color ? `checked` : ``}
          />
          <label for="color-${color}-${this._id}" class="card__color card__color--${color}">${color}</label>
        `.trim();
      }).join(``);
    };

    const getTagsTemplate = [...this._tags].map((tag) => {
      return `
        <span class="card__hashtag-inner">
          <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input"/>
          <p class="card__hashtag-name">#${tag}</p>
          <button type="button" class="card__hashtag-delete">delete</button>
        </span>
      `.trim();
    }).join(``);

    return `
      <article class="card card--edit card--${this._color} ${isTaskRepeating ? `card--repeat` : ``}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--archive">archive</button>
              <button type="button" class="card__btn card__btn--favorites card__btn--disabled">favorites</button>
            </div>
      
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>
      
            <div class="card__textarea-wrap">
              <label>
                <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._description}</textarea>
              </label>
            </div>
      
            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">${this._dueDate ? `yes` : `no`}</span>
                  </button>
      
                  <fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input class="card__date" type="text" placeholder="" name="date"
                        value="
                          ${new Date(this._dueDate).toLocaleDateString(`en-GB`, {day: `2-digit`, month: `long`})} 
                          ${new Date(this._dueDate).toLocaleTimeString(`en-US`, {hour: `2-digit`, minute: `2-digit`})}"
                      />
                    </label>
                  </fieldset>
      
                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${isTaskRepeating ? `yes` : `no`}</span>
                  </button>
      
                  <fieldset class="card__repeat-days">
                    <div class="card__repeat-days-inner">
                      ${getRepeatDaysTemplate}
                    </div>
                  </fieldset>
                </div>
      
                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${getTagsTemplate}
                  </div>
      
                  <label>
                    <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here"/>
                  </label>
                </div>
              </div>
      
              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${getColorControlsTemplate()}
                </div>
              </div>
            </div>
      
            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
    `.trim();
  }
}
