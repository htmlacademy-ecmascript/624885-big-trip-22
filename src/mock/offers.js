import { EVENT_DESCRIPTIONS, EVENT_TYPES } from '../constants.js';
import { incrementCounter, getRandomNumber } from '../utils.js';

const START_ID_COUNTER = 0;
const MAX_OFFER_PRICE = 500;
const getEventTypeId = incrementCounter(START_ID_COUNTER);
const getOfferId = incrementCounter(START_ID_COUNTER);

function getOffersByType() {
  const ID = getEventTypeId();
  const type = EVENT_TYPES[ID];

  return {
    type: type,
    offers:
    [
      {
        id: getOfferId(),
        title:`${type} offer - 1`,
        price: getRandomNumber(1, MAX_OFFER_PRICE)
      },
      {
        id: getOfferId(),
        title:`${type} offer - 2`,
        price: getRandomNumber(1, MAX_OFFER_PRICE)
      },
      {
        id: getOfferId(),
        title:`${type} offer - 3`,
        price: getRandomNumber(1, MAX_OFFER_PRICE)
      }
    ]
  };
}

function getOffers() {
  return Array.from({length: EVENT_DESCRIPTIONS.length}, getOffersByType);
}

export { getOffers };
