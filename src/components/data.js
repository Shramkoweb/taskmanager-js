/* Получаем дату в указаном диапазоне */
export const getDateInRange = (startDay, endDay) => {
  const UNIT = {
    HOURS_IN_DAY: 24,
    MINUTES_IN_HOUR: 60,
    SECONDS_IN_MINUTE: 60,
    MILLISECONDS_IN_SECOND: 1000
  };

  return Date.now() +
    startDay +
    Math.floor(Math.random() * endDay) *
    UNIT.HOURS_IN_DAY *
    UNIT.MINUTES_IN_HOUR *
    UNIT.SECONDS_IN_MINUTE *
    UNIT.MILLISECONDS_IN_SECOND;
};
