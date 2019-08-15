import {getControl} from "./components/control";
import {getSearch} from "./components/search";
import {getFilters} from "./components/filter";
import {getBoard} from "./components/board";
import {renderComponent} from "./components/util";
import {getCards, getFiltersCount} from "./data";

const CARD_COUNT = 8;
const mainControlElement = document.querySelector(`.control`);
const mainElement = document.querySelector(`main`);
const TASKS = getCards(CARD_COUNT);

/* Рендер компонентов в разметку */
renderComponent(mainControlElement, getControl());
renderComponent(mainElement, getSearch());
renderComponent(mainElement, getFilters(getFiltersCount(TASKS)));
renderComponent(mainElement, getBoard(TASKS));
