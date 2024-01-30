import { UpdateType } from '../constants.js';
import Observable from '../framework/observable.js';
import { updateItem } from '../utils.js';

export default class TripEventModel extends Observable {
  #tripEvents = [];
  #tripEventApiService = null;
  #destinationModel = null;
  #offerModel = null;

  constructor({tripEventApiService, destinationModel, offerModel}) {
    super();
    this.#tripEventApiService = tripEventApiService;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  async init() {
    try {
      await this.#destinationModel.init();
      await this.#offerModel.init();
      const tripEvents = await this.#tripEventApiService.tripEvents;
      this.#tripEvents = tripEvents.map(this.#adaptToClient);
    } catch (err) {
      this.#tripEvents = [];
    }

    this._notify(UpdateType.INIT);
  }

  get tripEvents() {
    return this.#tripEvents;
  }

  getById(id) {
    return this.#tripEvents.find((tripEvent) => tripEvent.id === id);
  }

  addTripEvent(updateType, tripEvent) {
    const addedPoint = tripEvent;
    this.#tripEvents = [...this.#tripEvents, addedPoint];
    this._notify(updateType, addedPoint);
  }

  async updateTripEvent(updateType, tripEvent) {
    try {
      const response = await this.#tripEventApiService.updateTripEvent(tripEvent);
      const updatedPoint = this.#adaptToClient(response);
      this.#tripEvents = updateItem(this.#tripEvents, updatedPoint);
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can not update point');
    }
  }

  deleteTripEvent(updateType, tripEvent) {
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
