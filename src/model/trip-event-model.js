import Observable from '../framework/observable.js';
import { addTripEvent, deleteTripEvent, getMockTripEvents, updateTripEvent } from '../mock/trip-event.js';
import { updateItem } from '../utils.js';

export default class TripEventModel extends Observable {
  #tripEvents = [];
  #tripEventApiService = null;

  constructor({tripEventApiService}) {
    super();
    this.#tripEvents = getMockTripEvents();
    this.#tripEventApiService = tripEventApiService;
    this.#tripEventApiService.tripEvents.then((tripEvents) => {
      console.log(tripEvents.map(this.#adaptToClient));
    });
  }

  get tripEvents() {
    return this.#tripEvents;
  }

  getById(id) {
    return this.#tripEvents.find((tripEvent) => tripEvent.id === id);
  }

  addTripEvent(updateType, tripEvent) {
    const addedPoint = addTripEvent(tripEvent);
    this.#tripEvents = [...this.#tripEvents, addedPoint];
    this._notify(updateType, addedPoint);
  }

  updateTripEvent(updateType, tripEvent) {
    const updatedPoint = updateTripEvent(tripEvent);
    this.#tripEvents = updateItem(this.#tripEvents, updatedPoint);
    this._notify(updateType, updatedPoint);
  }

  deleteTripEvent(updateType, tripEvent) {
    deleteTripEvent(tripEvent);
    this.#tripEvents = this.#tripEvents.filter((item) => item.id !== tripEvent.id);
    this._notify(updateType, tripEvent);
  }

  #adaptToClient(tripEvent) {
    const adaptedTripEvent = {
      ...tripEvent,
      startTime: tripEvent['date_from'],
      endTime: tripEvent['date_to'],
      price: tripEvent['base_price'],
      favorite: tripEvent['is_favorite'],
    };

    delete adaptedTripEvent['date_from'];
    delete adaptedTripEvent['date_to'];
    delete adaptedTripEvent['base_price'];
    delete adaptedTripEvent['is_favorite'];

    return adaptedTripEvent;
  }
}
