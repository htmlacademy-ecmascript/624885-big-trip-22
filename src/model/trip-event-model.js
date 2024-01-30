import Observable from '../framework/observable.js';
import { addTripEvent, deleteTripEvent, getMockTripEvents, updateTripEvent } from '../mock/trip-event.js';
import { updateItem } from '../utils.js';

export default class TripEventModel extends Observable {
  #tripEvents = [];

  constructor() {
    super();
    this.#tripEvents = getMockTripEvents();
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
}
