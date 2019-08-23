import {Position, renderElement} from "./util";
import {getCards, getFiltersCount} from "./data";
import Filters from "./components/filters";
import Menu from "./components/menu";
import Task from "./components/task";
import TaskEdit from "./components/task-edit";
import Board from "./components/board";

const CARD_COUNT = 25;
const MAX_CARD_TO_RENDER = 8;
const CARDS = getCards(CARD_COUNT);


const mainControlElement = document.querySelector(`.control`);
const mainElement = document.querySelector(`main`);

/*/!* Рендер компонентов в разметку *!/
renderComponent(mainControlElement, getControl());
renderComponent(mainElement, getSearch());
renderComponent(mainElement, getFilters(getFiltersCount(CARDS)));
renderComponent(mainElement, getBoard(CARDS.slice(0, MAX_CARD_TO_RENDER)));

const loadMoreButton = mainElement.querySelector(`.load-more`);
const cardsBoardElement = mainElement.querySelector(`.board__tasks`);

let CARDS_ON_PAGE = MAX_CARD_TO_RENDER;
let LEFT_CARDS_TO_RENDER = CARDS.length - CARDS_ON_PAGE;

const renderLeftCards = () => {
  renderComponent(cardsBoardElement, getBoardCards(CARDS.slice(CARDS_ON_PAGE, (CARDS_ON_PAGE + MAX_CARD_TO_RENDER))));

  CARDS_ON_PAGE = CARDS_ON_PAGE + MAX_CARD_TO_RENDER;
  LEFT_CARDS_TO_RENDER = CARDS.length - CARDS_ON_PAGE;

  if (LEFT_CARDS_TO_RENDER <= 0) {
    loadMoreButton.classList.add(`visually-hidden`);
    loadMoreButton.removeEventListener(`click`, onLoadMoreButtonClick);
  }
};

const onLoadMoreButtonClick = () => {
  renderLeftCards();
};

loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);*/

const renderMenu = () => {
  const menuInstance = new Menu();
  renderElement(mainControlElement, menuInstance.getElement(), Position.BEFOREEND);
};

const renderFilters = () => {
  const filtersInstance = new Filters(getFiltersCount(CARDS));
  renderElement(mainElement, filtersInstance.getElement(), Position.BEFOREEND);
};

const renderTask = () => {
  const task = new Task(CARDS[0]);

  renderElement(mainElement, task.getElement(), Position.BEFOREEND);
};

const renderEditTask = () => {
  const editTask = new TaskEdit(CARDS[1]);

  renderElement(mainElement, editTask.getElement(), Position.BEFOREEND);
};

const renderBoard = (cards) => {
  const board = new Board(cards);
  renderElement(mainElement, board.getElement(), Position.BEFOREEND);
};

renderMenu();
renderFilters();
renderBoard(CARDS);
