import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM D';

function humanizeEventDate(eventDate) {
  return eventDate ? dayjs(eventDate).format(DATE_FORMAT) : '';
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const getRandomNumber = (from, to) => {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(to), Math.abs(from)));
  return Math.round(Math.random() * (upper - lower) + lower);
};

export { getRandomArrayElement, getRandomNumber, humanizeEventDate };
