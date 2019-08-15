import {getControl} from "./components/control";
import {getSearch} from "./components/search";
import {getFilters} from "./components/filter";
import {getBoard, getBoardCards} from "./components/board";
import {renderComponent} from "./components/util";
import {getCards, getFiltersCount} from "./data";

const CARD_COUNT = 25;
const MAX_CARD_TO_RENDER= 8;
const CARDS = getCards(CARD_COUNT);


const mainControlElement = document.querySelector(`.control`);
const mainElement = document.querySelector(`main`);

/* Рендер компонентов в разметку */
renderComponent(mainControlElement, getControl());
renderComponent(mainElement, getSearch());
renderComponent(mainElement, getFilters(getFiltersCount(CARDS)));
renderComponent(mainElement, getBoard(CARDS.slice(0, MAX_CARD_TO_RENDER)));

const loadMoreButton = mainElement.querySelector(`.load-more`);
const cardsBoardElement = mainElement.querySelector(`.board__tasks`);

let cardsLeft = MAX_CARD_COUNT - cardsOnPage;

const renderLeftCards = () => {
  renderComponent(cardsBoardElement, getBoardCards(CARDS.slice(cardsOnPage, MAX_CARD_COUNT)));
};

const onLoadMoreButtonClick = () => {
  renderLeftCards(cardsOnPage, MAX_CARD_COUNT);
};

loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
