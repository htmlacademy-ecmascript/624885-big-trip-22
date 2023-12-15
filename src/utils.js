import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM D';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';

function humanizeEventDate(eventDate) {
  return eventDate ? dayjs(eventDate).format(DATE_FORMAT) : '';
}

function createDateTimeString(eventDate) {
  return eventDate ? dayjs(eventDate).format(DATE_TIME_FORMAT) : '';
}

function createTimeString(eventDate) {
  return eventDate ? dayjs(eventDate).format(TIME_FORMAT) : '';
}

function getDuration(startTime, endTime) {
  const totalMinuts = dayjs(endTime).diff(startTime, 'm');
  const totalHours = Math.floor(totalMinuts / 60);
  const minuts = totalMinuts % 60;
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  let returnString = '';
  returnString += days ? `${days}D ` : '';
  returnString += hours ? `${hours}H ` : '';
  returnString += `${minuts}M`;
  return returnString;
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const getRandomNumber = (from, to) => {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(to), Math.abs(from)));
  return Math.round(Math.random() * (upper - lower) + lower);
};

export {
  getRandomArrayElement,
  getRandomNumber,
  humanizeEventDate,
  createDateTimeString,
  createTimeString,
  getDuration
};
