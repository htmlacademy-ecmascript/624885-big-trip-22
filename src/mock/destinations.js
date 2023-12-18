import { CITIES, EVENT_DESCRIPTIONS } from '../constants';
import { incrementCounter, getRandomNumber, getRandomArrayElement } from '../utils.js';

const START_ID_COUNTER = 1;
const MAX_PICTURES_COUNT = 5;

function getDescription() {
  let descriptionText = '';
  const qtyOfPhrases = getRandomNumber(1, 5);
  for(let i = 0; i <= qtyOfPhrases; i++) {
    descriptionText += getRandomArrayElement(EVENT_DESCRIPTIONS);
  }
  return descriptionText;
}

const getCityId = incrementCounter(START_ID_COUNTER);

function setupDestination() {
  const ID = getCityId();

  return {
    id: ID.toString(),
    name: CITIES[ID - 1],
    description: getDescription(),
    pictures: Array.from({length: getRandomNumber(0, MAX_PICTURES_COUNT)}, () => ({
      src: `https://loremflickr.com/248/152?random=${getRandomNumber(0, 1000)}`,
      description: getRandomArrayElement(EVENT_DESCRIPTIONS)
    }))
  };
}

function getDestinations() {
  return Array.from({length: CITIES.length}, setupDestination);
}

export { getDestinations };
