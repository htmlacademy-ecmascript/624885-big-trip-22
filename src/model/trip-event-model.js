import { getMockTripEvents } from '../mock/trip-event.js';

export default class TripEventModel {
  tripEvents = getMockTripEvents();

  get() {
    return this.tripEvents;
  }
}
