import {getControl} from "./components/control";
import {getSearch} from "./components/search";
import {getFilters} from "./components/filter";
import {getBoard} from "./components/board";
import {renderComponent} from "./components/util";
import {getCards, getFiltersCount} from "./data";

const CARD_COUNT = 8;
const MAX_CARD_COUNT = 25;
const CARDS = getCards(MAX_CARD_COUNT);

const mainControlElement = document.querySelector(`.control`);
const mainElement = document.querySelector(`main`);
const loadMoreButton = mainElement.querySelector(`.load-more`);
const cardsBoardElement = mainElement.querySelector(`.board__tasks`);

/* Рендер компонентов в разметку */
renderComponent(mainControlElement, getControl());
renderComponent(mainElement, getSearch());
renderComponent(mainElement, getFilters(getFiltersCount(CARDS)));
renderComponent(mainElement, getBoard(CARDS));

const onLoadMoreButtonCkick = () => {

};

loadMoreButton.addEventListener(`click`, onLoadMoreButtonCkick);
