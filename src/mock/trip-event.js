import { CITIES } from '../constants.js';
import { getRandomNumber } from '../utils.js';

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


const mockTripEvents = [
  {
    type: eventType[5],
    destination: getRandomNumber(0, CITIES.length).toString(),
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
    destination: getRandomNumber(0, CITIES.length).toString(),
    startTime: new Date('2023-12-02T09:15'),
    endTime: new Date('2023-12-02T13:30'),
    price: getRandomNumber(10, 5000),
    favorite: false,
    offers: [1]
  },
  {
    type: eventType[1],
    destination: getRandomNumber(0, CITIES.length).toString(),
    startTime: new Date('2023-12-02T17:00'),
    endTime: new Date('2023-12-03T18:30'),
    price: getRandomNumber(10, 5000),
    favorite: true,
    offers: []
  },
  {
    type: eventType[7],
    destination: getRandomNumber(0, CITIES.length).toString(),
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
