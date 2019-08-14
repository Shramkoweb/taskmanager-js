import {getCard} from "./card";
import {getCardEdit} from "./card-edit";
import {getLoadMoreButton} from "./load-more-button";
import {getCardData} from "./data";

/* Ф-я гереации карточек */
const getCards = (count) => {
  const cards = [];

  for (let i = 0; i < count; i++) {
    cards.push(getCard(getCardData()));
  }

  return cards.join(` `);
};

/* Ф-я генерации разметки борда для карточек */
export const getBoard = (cardsCount) => {
  return `
      <section class="board container">
        <div class="board__filter-list">
          <a href="#" class="board__filter">SORT BY DEFAULT</a>
          <a href="#" class="board__filter">SORT BY DATE up</a>
          <a href="#" class="board__filter">SORT BY DATE down</a>
        </div>
        
        <div class="board__tasks">
          ${getCardEdit()}
          ${getCards(cardsCount)}
        </div>
        
        ${getLoadMoreButton()}
      </section>
  `;
};
