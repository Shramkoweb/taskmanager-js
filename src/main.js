import {Position, renderElement} from "./util";
import {getCards, getFiltersCount} from "./data";
import Filters from "./components/filters";
import Menu from "./components/menu";
import Task from "./components/task";
import TaskEdit from "./components/task-edit";
import Board from "./components/board";
import Search from "./components/search";

const CARD_COUNT = 25;
const MAX_CARD_TO_RENDER = 8;
const CARDS = getCards(CARD_COUNT);

const mainControlElement = document.querySelector(`.control`);
const mainElement = document.querySelector(`main`);

const renderMenu = () => {
  const menuInstance = new Menu();
  renderElement(mainControlElement, menuInstance.getElement(), Position.BEFOREEND);
};

const renderFilters = () => {
  const filtersInstance = new Filters(getFiltersCount(CARDS));
  renderElement(mainElement, filtersInstance.getElement(), Position.BEFOREEND);
};

const renderSearch = () => {
  const search = new Search();

  renderElement(mainElement, search.getElement(), Position.BEFOREEND);
};

const board = new Board().getElement();
const tasksContainer = board.querySelector(`.board__tasks`);


const renderTasks = (tasks) => {
  const fragment = document.createDocumentFragment();

  tasks.forEach((task) => {
    const taskInstance = new Task(task);
    const taskEditInstance = new TaskEdit(task);

    taskInstance.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        tasksContainer.replaceChild(taskEditInstance.getElement(), taskInstance.getElement());
      });

    fragment.appendChild(taskInstance.getElement());
  });

  return fragment;
};

const renderBoard = (cards) => {
  tasksContainer.appendChild(renderTasks(cards));

  renderElement(mainElement, board, Position.BEFOREEND);
};

renderMenu();
renderSearch();
renderFilters();
renderBoard(CARDS.slice(0, MAX_CARD_TO_RENDER));

const loadMoreButton = mainElement.querySelector(`.load-more`);
const cardsBoardElement = mainElement.querySelector(`.board__tasks`);

let CARDS_ON_PAGE = MAX_CARD_TO_RENDER;
let LEFT_CARDS_TO_RENDER = CARDS.length - CARDS_ON_PAGE;

const renderLeftCards = () => {
  cardsBoardElement.appendChild(renderTasks(CARDS.slice(CARDS_ON_PAGE, (CARDS_ON_PAGE + MAX_CARD_TO_RENDER))));

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

loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
