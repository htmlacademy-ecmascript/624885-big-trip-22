import dayjs from 'dayjs';
import { HOURS_IN_DAY, MINUTS_IN_HOUR, DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from './constants';

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
  const totalHours = Math.floor(totalMinuts / MINUTS_IN_HOUR);
  const minuts = totalMinuts % MINUTS_IN_HOUR;
  const days = Math.floor(totalHours / HOURS_IN_DAY);
  const hours = totalHours % HOURS_IN_DAY;

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
