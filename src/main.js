import {getRandomNumberInRange, isEscKeyDown, Position, renderElement, unrenderElement} from "./util";
import {getCards} from "./data";
import {getFiltersCount} from "./filter";
import Filters from "./components/filters";
import Menu from "./components/menu";
import Task from "./components/task";
import TaskEdit from "./components/task-edit";
import Board from "./components/board";
import Search from "./components/search";


const cardAmount = getRandomNumberInRange(8, 25); // Добавил для более навглядной проверки фильтров
const MAX_CARD_TO_RENDER = 8;
const cards = getCards(cardAmount);
let CARDS_ON_PAGE = MAX_CARD_TO_RENDER;
let LEFT_CARDS_TO_RENDER = cards.length - CARDS_ON_PAGE;

const mainControlElement = document.querySelector(`.control`);
const mainElement = document.querySelector(`main`);

const renderMenu = () => {
  const menuInstance = new Menu();
  renderElement(mainControlElement, menuInstance.getElement(), Position.BEFOREEND);
};

const renderFilters = () => {
  const filtersInstance = new Filters(getFiltersCount(cards));
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

    const closeEditTask = () => {
      tasksContainer.replaceChild(taskInstance.getElement(), taskEditInstance.getElement());
      document.removeEventListener(`keydown`, onTaskEditEscPress);
    };

    const openEditTask = () => {
      tasksContainer.replaceChild(taskEditInstance.getElement(), taskInstance.getElement());
      document.addEventListener(`keydown`, onTaskEditEscPress);
    };

    const onTaskEditEscPress = (evt) => isEscKeyDown(evt, closeEditTask);
    const onEditTaskButtonClick = () => openEditTask();

    taskInstance.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, onEditTaskButtonClick);

    taskEditInstance.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onTaskEditEscPress);
      });

    taskEditInstance.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onTaskEditEscPress);
      });

    taskEditInstance.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, closeEditTask);

    fragment.appendChild(taskInstance.getElement());
  });

  return fragment;
};

const renderBoard = (tasks) => {
  tasksContainer.appendChild(renderTasks(tasks));

  renderElement(mainElement, board, Position.BEFOREEND);
};

renderMenu();
renderSearch();
renderFilters();
renderBoard(cards.slice(0, MAX_CARD_TO_RENDER));

const loadMoreButton = mainElement.querySelector(`.load-more`);
const cardsBoardElement = mainElement.querySelector(`.board__tasks`);

const renderLeftCards = () => {
  cardsBoardElement.appendChild(renderTasks(cards.slice(CARDS_ON_PAGE, (CARDS_ON_PAGE + MAX_CARD_TO_RENDER))));

  CARDS_ON_PAGE = CARDS_ON_PAGE + MAX_CARD_TO_RENDER;
  LEFT_CARDS_TO_RENDER = cards.length - CARDS_ON_PAGE;

  if (LEFT_CARDS_TO_RENDER <= 0) {
    unrenderElement(loadMoreButton);
  }
};

const onLoadMoreButtonClick = () => {
  renderLeftCards();
};

loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
