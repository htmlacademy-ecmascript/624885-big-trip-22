import dayjs from 'dayjs';
import { HOURS_IN_DAY, MINUTS_IN_HOUR, DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT, FilterType, SortType, TRIP_ITEMS_COUNT, TRIP_DATES_FORMAT } from './constants';

function humanizeEventDate(eventDate) {
  return eventDate ? dayjs(eventDate).format(DATE_FORMAT) : '';
}

function humanizeTripDate(eventDate) {
  return eventDate ? dayjs(eventDate).format(TRIP_DATES_FORMAT) : '';
}

function createDateTimeString(eventDate) {
  return eventDate ? dayjs(eventDate).format(DATE_TIME_FORMAT) : '';
}

function createTimeString(eventDate) {
  return eventDate ? dayjs(eventDate).format(TIME_FORMAT) : '';
}

function addLeadingZero(number) {
  return number < 10 ? `0${number}` : +number;
}

function getDuration(startTime, endTime) {
  const totalMinuts = dayjs(endTime).diff(startTime, 'm');
  const totalHours = Math.floor(totalMinuts / MINUTS_IN_HOUR);
  const minuts = totalMinuts % MINUTS_IN_HOUR;
  const days = Math.floor(totalHours / HOURS_IN_DAY);
  const hours = totalHours % HOURS_IN_DAY;

  let returnString = '';
  returnString += days ? `${addLeadingZero(days)}D ` : '';
  returnString += `${addLeadingZero(hours)}H `;
  returnString += `${addLeadingZero(minuts)}M`;
  return returnString;
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

const sortDayAscending = (firstElement, secondElement) => dayjs(firstElement.startTime).diff(secondElement.startTime);
const sortTimeAscending = (firstElement, secondElement) => dayjs(secondElement.endTime).diff(secondElement.startTime) - dayjs(firstElement.endTime).diff(firstElement.startTime);
const sortPriceAscending = (firstElement, secondElement) => secondElement.price - firstElement.price;
const sorting = {
  [SortType.DAY]: (tripEvents) => [...tripEvents].sort(sortDayAscending),
  [SortType.TIME]: (tripEvents) => [...tripEvents].sort(sortTimeAscending),
  [SortType.PRICE]: (tripEvents) => [...tripEvents].sort(sortPriceAscending),
};

const isTripEventPresent = (tripEvent) => dayjs().isAfter(tripEvent.startTime, 'day') &&
  dayjs().isBefore(tripEvent.endTime, 'day');
const isTripEventFuture = (tripEvent) => dayjs().isBefore(tripEvent.startTime, 'day');
const isTripEventPast = (tripEvent) => dayjs().isAfter(tripEvent.endTime, 'day');
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

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const getTripDates = (tripEvents) => {
  if(tripEvents.length === 0) {
    return '';
  }
  const sortedTripEvents = sorting[SortType.DAY](tripEvents);
  return `${humanizeTripDate(sortedTripEvents[0].startTime)} &mdash; ${humanizeTripDate(sortedTripEvents[sortedTripEvents.length - 1].endTime)}`;
};

const getTripRoute = (tripEvents, destinations) => {
  if(tripEvents.length === 0) {
    return '';
  }
  const sortedTripEvents = sorting[SortType.DAY](tripEvents);
  const destinationNames = sortedTripEvents
    .map((tripEvent) => destinations
      .find((destination) => destination.id === tripEvent.destination).name);
  return destinationNames.length <= TRIP_ITEMS_COUNT ? destinationNames.join('&nbsp;&mdash;&nbsp;')
    : `${destinationNames.at(0)} &mdash;&nbsp;...&nbsp;&mdash; ${destinationNames.at(-1)}`;
};

const getOffersPrice = (tripEvent, offers) => {
  let price = 0;
  const currentOffers = offers
    .find((offer) => offer.type === tripEvent.type).offers;
  for(const offer of currentOffers) {
    if(tripEvent.offers.includes(offer.id)) {
      price += offer.price;
    }
  }
  return price;
};

const getTripPrice = (tripEvents, offers) => {
  if(tripEvents.length === 0) {
    return '';
  }
  let price = 0;
  tripEvents.forEach((tripEvent) => {
    price += tripEvent.price + getOffersPrice(tripEvent, offers);
  });
  return price;
};

export {
  humanizeEventDate,
  createDateTimeString,
  createTimeString,
  getDuration,
  updateItem,
  sortDayAscending,
  sortTimeAscending,
  sortPriceAscending,
  isMinorChange,
  filtering,
  sorting,
  checkPriceIsNumeric,
  capitalize,
  getTripRoute,
  getTripDates,
  getTripPrice
};
