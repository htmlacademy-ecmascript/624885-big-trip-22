import { getMockOffers, getMockTripEvents } from '../mock/trip-event.js';

export default class TripEventModel {
  tripEvents = getMockTripEvents();
  offers = getMockOffers();

  getTripEvents() {
    return this.tripEvents;
  }

  getOffers() {
    return this.offers;
  }
}
