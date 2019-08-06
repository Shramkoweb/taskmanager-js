'use strict';

const CONTROL_CONTAINER_CLASSNAME = `control__btn-wrap`;
/* Массив обьектов для мокапа контролов*/
const CONTROL__ELEMENTS = [
  {
    id: `control__new-task`,
    class: `control__label--new-task`,
    text: `+ ADD NEW TASK`
  },
  {
    id: `control__task`,
    text: `TASKS`,
    checked: true
  },
  {
    id: `control__statistic`,
    text: `STATISTICS`,
  }
];
const controlElement = document.querySelector(`.control`);

/* Ф-я создания разметки контрола */
const getControl = (id = ``, classModificator = ``, text = ``, isChecked = false) => {
  return `
    <input
      type="radio"
      name="control"
      id=${id}
      class="control__input visually-hidden"
      checked = ${isChecked}
    />
    <label for=${id}  class="control__label  ${classModificator}"
      >${text}</label
    >
  `;
};

/* Ф-я создания массива контролов */
const generateControlElements = (elements) => {
  const controls = [];

  elements.forEach((element) => {
    controls.push(getControl(element.id, element.class, element.text, element.checked));
  });

  return controls.join(``);
};

/* Ф-я вставки разметки */
const renderComponent = (wrapper, component, classNames) => {
  const contrainer = document.createElement(`section`);

  contrainer.className = classNames;
  contrainer.insertAdjacentHTML(`beforeend`, component);

  wrapper.insertAdjacentElement(`beforeend`, contrainer);
};

renderComponent(controlElement, generateControlElements(CONTROL__ELEMENTS), CONTROL_CONTAINER_CLASSNAME);
