const getFilter = ({title, count}) => {
  return `
      <input
        type="radio"
        id="filter__all"
        class="filter__input visually-hidden"
        name="filter"
        ${count === 0 ? `disabled` : ``}
        ${title === `all` ? `checked` : ``}
      />
      <label for="filter__${title}" class="filter__label">
        ${title} <span class="filter__${title}-count">${count}</span>
      </label>
  `.trim();
};


export const getFilters = (filters) => {
  return `
    <section class="main__filter filter container">
      ${filters.map((filter) => getFilter(filter)).join(``)}
    </section>
  `.trim();
};
