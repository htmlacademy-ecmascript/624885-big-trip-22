import { getRandomArrayElement, getRandomNumber } from '../utils.js';

const eventType = [
  'taxi', 'bus', 'train', 'ship', 'drive',
  'flight', 'check-in', 'sightseeing', 'restaurant'
];

const offers = [
  {
    id: 1,
    type: 'taxi',
    title: 'Order Uber',
    price: 20
  },
  {
    id: 2,
    type: 'flight',
    title: 'Add luggage',
    price: 30
  },
  {
    id: 3,
    type: 'flight',
    title: 'Switch to comfort class',
    price: 100
  },
  {
    id: 4,
    type: 'drive',
    title: 'Rent a car',
    price: 200
  },
  {
    id: 5,
    type: 'check-in',
    title: 'Add breakfast',
    price: 50
  },
  {
    id: 6,
    type: 'sightseeing',
    title: 'Book tickets',
    price: 40
  },
  {
    id: 7,
    type: 'sightseeing',
    title: 'Lunch in a city',
    price: 30
  },

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

function getDescription() {
  let descriptionText = '';
  const qtyOfPhrases = getRandomNumber(1, 5);
  for(let i = 0; i <= qtyOfPhrases; i++) {
    descriptionText += getRandomArrayElement(eventDescriptions);
  }
  return descriptionText;
}

const eventDestinations = [
  {
    id: 1,
    name: 'Amsterdam',
    description: getDescription(),
    pictures: [
      `https://loremflickr.com/248/152?random=${getRandomNumber(0, 1000)}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber(0, 1000)}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber(0, 1000)}`
    ]
  },
  {
    id: 2,
    name: 'Chamonix',
    description: getDescription(),
    pictures: [
      `https://loremflickr.com/248/152?random=${getRandomNumber(0, 1000)}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber(0, 1000)}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber(0, 1000)}`
    ]
  },
  {
    id: 3,
    name: 'Geneva',
    description: getDescription(),
    pictures: [
      `https://loremflickr.com/248/152?random=${getRandomNumber(0, 1000)}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber(0, 1000)}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber(0, 1000)}`
    ]
  }
];

const mockTripEvents = [
  {
    type: eventType[5],
    destination: getRandomArrayElement(eventDestinations),
    startTime: new Date('2023-12-01T12:00'),
    endTime: new Date('2023-12-01T13:30'),
    price: getRandomNumber(10, 5000),
    favorite: false,
    offers: [
      2
    ]
  },
  {
    type: eventType[0],
    destination: getRandomArrayElement(eventDestinations),
    startTime: new Date('2023-12-02T09:15'),
    endTime: new Date('2023-12-02T13:30'),
    price: getRandomNumber(10, 5000),
    favorite: false,
    offers: [1]
  },
  {
    type: eventType[1],
    destination: getRandomArrayElement(eventDestinations),
    startTime: new Date('2023-12-02T17:00'),
    endTime: new Date('2023-12-03T18:30'),
    price: getRandomNumber(10, 5000),
    favorite: true,
    offers: []
  },
  {
    type: eventType[7],
    destination: getRandomArrayElement(eventDestinations),
    startTime: new Date('2023-12-03T11:00'),
    endTime: new Date('2023-12-03T18:49'),
    price: getRandomNumber(10, 5000),
    favorite: false,
    offers: [
      6, 7
    ]
  }
];

const getMockTripEvents = () => mockTripEvents;
const getMockOffersList = () => offers;

export { getMockTripEvents, getMockOffersList };
