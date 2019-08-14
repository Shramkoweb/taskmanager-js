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
const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

/* Получаем дату в указаном диапазоне */
export const getDateInRange = (range) => {
  const UNIT = {
    HOURS_IN_DAY: 24,
    MINUTES_IN_HOUR: 60,
    SECONDS_IN_MINUTE: 60,
    MILLISECONDS_IN_SECOND: 1000
  };

  return Date.now() +
    getRandomNumberInRange(-range, +range) *
    UNIT.HOURS_IN_DAY *
    UNIT.MINUTES_IN_HOUR *
    UNIT.SECONDS_IN_MINUTE *
    UNIT.MILLISECONDS_IN_SECOND;
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
const getCardData = () => ({
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
  color: getRandomItemFrom(COLORS),
  isFavorite: getRandomBoolean(),
  isArchive: getRandomBoolean()
});
