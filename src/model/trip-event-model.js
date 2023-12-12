import { getMockEvent } from '../mock/trip-event.js';

const TRIP_EVENT_COUNTER = 4;

export default class TripEventModel {
  tripEvents = Array.from({length: TRIP_EVENT_COUNTER}, getMockEvent);

  getTripEvents() {
    return this.tripEvents;
  }
}
