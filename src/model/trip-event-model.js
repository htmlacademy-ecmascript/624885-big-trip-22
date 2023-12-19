import { getMockTripEvents } from '../mock/trip-event.js';

export default class TripEventModel {
  #tripEvents = [];

  constructor() {
    this.#tripEvents = getMockTripEvents();
  }

  get tripEvents() {
    return this.#tripEvents;
  }
}
