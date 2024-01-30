import dayjs from 'dayjs';
import { HOURS_IN_DAY, MINUTS_IN_HOUR, DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT, FilterType, SortType } from './constants';

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

function getRandomNumber(from, to) {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(to), Math.abs(from)));
  return Math.round(Math.random() * (upper - lower) + lower);
}

function incrementCounter(startFrom) {
  let counter = startFrom;
  return function () {
    return counter++;
  };
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

const sortDayAscending = (firstElement, secondElement) => dayjs(firstElement.startTime).diff(secondElement.startTime);
const sortTimeAscending = (firstElement, secondElement) => dayjs(firstElement.endTime).diff(firstElement.startTime) - dayjs(secondElement.endTime).diff(secondElement.startTime);
const sortPriceAscending = (firstElement, secondElement) => firstElement.price - secondElement.price;
const sorting = {
  [SortType.DAY]: (tripEvents) => [...tripEvents].sort(sortDayAscending),
  [SortType.TIME]: (tripEvents) => [...tripEvents].sort(sortTimeAscending),
  [SortType.PRICE]: (tripEvents) => [...tripEvents].sort(sortPriceAscending),
};

const isTripEventPresent = (tripEvent) => dayjs().isSame(tripEvent.startTime, 'day');
const isTripEventFuture = (tripEvent) => dayjs().isBefore(tripEvent.startTime, 'day');
const isTripEventPast = (tripEvent) => dayjs().isAfter(tripEvent.startTime, 'day');
const filtering = {
  [FilterType.EVERYTHING]: (tripEvents) => [...tripEvents],
  [FilterType.FUTURE]: (tripEvents) => tripEvents.filter(isTripEventFuture),
  [FilterType.PRESENT]: (tripEvents) => tripEvents.filter(isTripEventPresent),
  [FilterType.PAST]: (tripEvents) => tripEvents.filter(isTripEventPast)
};

const isMinorChange = (tripEventA, tripEventB) => tripEventA.startTime !== tripEventB.startTime ||
  tripEventA.price !== tripEventB.price ||
  getDuration(tripEventA.startTime, tripEventA.endTime) !== getDuration(tripEventA.startTime, tripEventB.endTime);

const checkPriceIsNumeric = (price) => /^\d+$/.test(+price);

export {
  getRandomArrayElement,
  getRandomNumber,
  humanizeEventDate,
  createDateTimeString,
  createTimeString,
  getDuration,
  incrementCounter,
  updateItem,
  sortDayAscending,
  sortTimeAscending,
  sortPriceAscending,
  isMinorChange,
  filtering,
  sorting,
  checkPriceIsNumeric
};
