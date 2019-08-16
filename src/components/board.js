import {getCard} from "./card";
import {getCardEdit} from "./card-edit";
import {getLoadMoreButton} from "./load-more-button";

/* Ф-я гереации карточек */
export const getBoardCards = (cards) => {
  return cards.map((card) => getCard(card)).join(``);
};

/* Ф-я генерации разметки борда для карточек */
export const getBoard = (cards) => {
  return `
      <section class="board container">
        <div class="board__filter-list">
          <a href="#" class="board__filter">SORT BY DEFAULT</a>
          <a href="#" class="board__filter">SORT BY DATE up</a>
          <a href="#" class="board__filter">SORT BY DATE down</a>
        </div>
        
        <div class="board__tasks">
          ${getCardEdit(cards[0])}
          ${getBoardCards(cards.slice(1))}
        </div>
        
        ${getLoadMoreButton()}
      </section>
  `.trim();
};
