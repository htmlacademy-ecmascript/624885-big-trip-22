import { getMockOffersList, getMockTripEvents } from '../mock/trip-event.js';

export default class TripEventModel {
  tripEvents = getMockTripEvents();
  offersList = getMockOffersList();

  getTripEvents() {
    return this.tripEvents;
  }

  getOffersList() {
    return this.offersList;
  }
}
