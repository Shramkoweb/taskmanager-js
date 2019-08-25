import {getRandomBoolean, getRandomNumberInRange, getRandomItemFrom} from "./util";

const DATE_RANGE = 7;
const TAGS_MIN_COUNT = 0;
const TAGS_MAX_COUNT = 3;

/* Массив заголовков карточки*/
const DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

/* Массив тегов */
const TAGS = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
];

/* Массив цветов */
const COLOURS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

const UNITS = {
  HOURS_IN_DAY: 24,
  MINUTES_IN_HOUR: 60,
  SECONDS_IN_MINUTE: 60,
  MILLISECONDS_IN_SECOND: 1000
};

const TIMESTAMP_DAY = UNITS.HOURS_IN_DAY * UNITS.MINUTES_IN_HOUR * UNITS.SECONDS_IN_MINUTE * UNITS.MILLISECONDS_IN_SECOND;

/* Получаем дату в указаном диапазоне */
export const getDateInRange = (range) => {
  return Date.now() + getRandomNumberInRange(-range, +range) * TIMESTAMP_DAY;
};

/* Генерация массива случайных хештегов */
const getRandomTags = (tags, count) => {
  const resultArray = [];

  for (let i = 0; i < count; i++) {
    resultArray.push(getRandomItemFrom(tags));
  }

  return resultArray;
};

/* Генерация обьекта для верстки карточки */
export const getCardData = () => ({
  description: getRandomItemFrom(DESCRIPTIONS),
  dueDate: getDateInRange(DATE_RANGE),
  repeatingDays: {
    'mo': getRandomBoolean(),
    'tu': false,
    'we': getRandomBoolean(),
    'th': false,
    'fr': getRandomBoolean(),
    'sa': false,
    'su': false,
  },
  tags: new Set(getRandomTags(TAGS, getRandomNumberInRange(TAGS_MIN_COUNT, TAGS_MAX_COUNT))),
  color: getRandomItemFrom(COLOURS),
  isFavorite: getRandomBoolean(),
  isArchive: getRandomBoolean()
});

/* Генерация массива обьектов карточек */
export const getCards = (count) => {
  return new Array(count).fill(``).map(getCardData);
};

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
