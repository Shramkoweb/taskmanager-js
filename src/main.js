import {getControl} from "./components/control";
import {getSearch} from "./components/search";
import {getFilter} from "./components/filter";
import {getBoard} from "./components/board";
import {renderComponent} from "./components/util";

const CARD_COUNT = 3;
const mainControlElement = document.querySelector(`.control`);
const mainElement = document.querySelector(`main`);

/* Рендер компонентов в разметку */
renderComponent(mainControlElement, getControl());
renderComponent(mainElement, getSearch());
renderComponent(mainElement, getFilter());
renderComponent(mainElement, getBoard(CARD_COUNT));

