import { getMockTripEvents } from '../mock/trip-event.js';

export default class TripEventModel {
  tripEvents = getMockTripEvents();

  getTripEvents() {
    return this.tripEvents;
  }
}
