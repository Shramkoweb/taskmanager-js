/* Вычесляем количество задач подходящих под фильтр */
export const getFiltersCount = (cards) => {
  const counts = {
    all: 0,
    overdue: 0,
    today: 0,
    favorites: 0,
    repeating: 0,
    tags: 0,
    archive: 0
  };

  cards.forEach((card) => {
    const currentDate = new Date();
    const cardDate = new Date(card.dueDate);
    const isCardToday = (currentDate.getDay() === cardDate.getDay()) && (currentDate.getDate() === cardDate.getDate());
    const isRepeating = Object.values(card.repeatingDays).some((day) => day);
    const isOverdue = currentDate > cardDate;

    if (isOverdue) {
      counts.overdue++;
    }
    if (isCardToday) {
      counts.today++;
    }
    if (card.isFavorite) {
      counts.favorites++;
    }
    if (isRepeating) {
      counts.repeating++;
    }
    if (card.tags) {
      counts.tags++;
    }
    if (card.isArchive) {
      counts.archive++;
    }
    counts.all = cards.length - counts.archive;
  });

  const resultFilters = [];

  for (let [key, value] of Object.entries(counts)) {
    resultFilters.push({
      title: key,
      count: value
    });
  }

  return resultFilters;
};
