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
      await Promise.all([
        this.#destinationModel.init(),
        this.#offerModel.init()
      ]);
      const tripEvents = await this.#tripEventApiService.tripEvents;
      this.#tripEvents = tripEvents.map(this.#adaptToClient);
      this._notify(UpdateType.INIT);
    } catch (err) {
      this.#tripEvents = [];
      this._notify(UpdateType.ERROR);
    }
  }

  get tripEvents() {
    return this.#tripEvents;
  }

  getById(id) {
    return this.#tripEvents.find((tripEvent) => tripEvent.id === id);
  }

  async addTripEvent(updateType, tripEvent) {
    try {
      const responce = await this.#tripEventApiService.addTripEvent(tripEvent);
      const addedPoint = this.#adaptToClient(responce);
      this.#tripEvents = [...this.#tripEvents, addedPoint];
      this._notify(updateType, addedPoint);
    } catch(err) {
      throw new Error('Can not add point');
    }
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

  async deleteTripEvent(updateType, tripEvent) {
    try {
      await this.#tripEventApiService.deleteTripEvent(tripEvent);
      this.#tripEvents = this.#tripEvents.filter((item) => item.id !== tripEvent.id);
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can not delete point');
    }
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
