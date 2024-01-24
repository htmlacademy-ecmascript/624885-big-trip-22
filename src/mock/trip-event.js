import { CITIES, EVENT_TYPES } from '../constants.js';
import { getRandomNumber } from '../utils.js';
import { nanoid } from 'nanoid';

const mockTripEvents = [
  {
    id: nanoid(),
    type: EVENT_TYPES[5],
    destination: getRandomNumber(0, CITIES.length).toString(),
    startTime: new Date('2023-12-01T12:00'),
    endTime: new Date('2023-12-01T13:30'),
    price: getRandomNumber(10, 5000),
    favorite: false,
    offers: [
      16
    ]
  },
  {
    id: nanoid(),
    type: EVENT_TYPES[0],
    destination: getRandomNumber(0, CITIES.length).toString(),
    startTime: new Date('2023-12-02T09:15'),
    endTime: new Date('2023-12-02T13:30'),
    price: getRandomNumber(10, 5000),
    favorite: false,
    offers: [1]
  },
  {
    id: nanoid(),
    type: EVENT_TYPES[1],
    destination: getRandomNumber(0, CITIES.length).toString(),
    startTime: new Date('2023-12-02T17:00'),
    endTime: new Date('2023-12-03T18:30'),
    price: getRandomNumber(10, 5000),
    favorite: true,
    offers: []
  },
  {
    id: nanoid(),
    type: EVENT_TYPES[7],
    destination: getRandomNumber(0, CITIES.length).toString(),
    startTime: new Date('2023-12-03T11:00'),
    endTime: new Date('2023-12-03T18:49'),
    price: getRandomNumber(10, 5000),
    favorite: false,
    offers: [
      21, 22
    ]
  }
];

const getMockTripEvents = () => mockTripEvents;

function updateTripEvent(data) {
  return data;
}

function addTripEvent(data) {
  return data;
}

function deleteTripEvent(data) {
  // delete tripEvent
  return data;
}

export { getMockTripEvents,updateTripEvent, addTripEvent, deleteTripEvent };
