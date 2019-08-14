import {getControl} from "./components/control";
import {getSearch} from "./components/search";
import {getFilter} from "./components/filter";
import {getBoard} from "./components/board";

const CARD_COUNT = 3;
const mainControlElement = document.querySelector(`.control`);
const mainElement = document.querySelector(`main`);

/* Ф-я рендера компонента */
const renderComponent = (container, component) => {
  return container.insertAdjacentHTML(`beforeend`, component);
};

/* Рендер компонентов в разметку */
renderComponent(mainControlElement, getControl());
renderComponent(mainElement, getSearch());
renderComponent(mainElement, getFilter());
renderComponent(mainElement, getBoard(CARD_COUNT));
import {getDateInRange} from "./components/data";

console.log(`${new Date(getDateInRange(1, 7)).toDateString()}`);

