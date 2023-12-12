import { getRandomArrayElement, getRandomNumber } from '../utils.js';

const eventType = [
  'Taxi', 'Bus', 'Train', 'Ship', 'Drive',
  'Flight', 'Check-in', 'Sightseeing', 'Restaurant'
];

const eventDestinations = [
  'Amsterdam', 'Chamonix', 'Geneva'
];

const eventDescriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const getDescription = () => {
  let descriptionText = '';
  const qtyOfPhrases = getRandomNumber(1, 5);
  for(let i = 0; i <= qtyOfPhrases; i++) {
    descriptionText += getRandomArrayElement(eventDescriptions);
  }
  return descriptionText;
};

const getMockEvent = () => ({
  date: new Date('12-11-2023'),
  type: getRandomArrayElement(eventType),
  destination: getRandomArrayElement(eventDestinations),
  timeFrom: '12:00',
  timeTo: '13:30',
  price: getRandomNumber(10, 5000),
  descriptionText: getDescription(),
  descriptionPhoto: `https://loremflickr.com/248/152?random=${getRandomNumber(0, 1000)}`
});

export { getMockEvent };
