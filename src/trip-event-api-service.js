import ApiService from './framework/api-service.js';
import { Method, SourceURL } from './constants.js';

export default class TripEventApiService extends ApiService {
  get tripEvents() {
    return this._load({url: SourceURL.POINTS}).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: SourceURL.DESTINATIONS}).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: SourceURL.OFFERS}).then(ApiService.parseResponse);
  }

  async updateTripEvent(tripEvent) {
    const responce = await this._load({
      url: `${SourceURL.POINTS}/${tripEvent.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(tripEvent)),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    const parsedResponce = await ApiService.parseResponse(responce);
    return parsedResponce;
  }

  async addTripEvent(tripEvent) {
    const responce = await this._load({
      url: SourceURL.POINTS,
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(tripEvent)),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    const parsedResponce = await ApiService.parseResponse(responce);
    return parsedResponce;
  }

  async deleteTripEvent(tripEvent) {
    const responce = await this._load({
      url: `${SourceURL.POINTS}/${tripEvent.id}`,
      method: Method.DELETE,
      body: JSON.stringify(this.#adaptToServer(tripEvent)),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    const parsedResponce = await ApiService.parseResponse(responce);
    return parsedResponce;
  }

  #adaptToServer(tripEvent) {
    const adaptedTripEvent = {
      ...tripEvent,
      'date_from': tripEvent.startTime,
      'date_to': tripEvent.endTime,
      'base_price': tripEvent.price,
      'is_favorite': tripEvent.favorite,
    };

    delete adaptedTripEvent.startTime;
    delete adaptedTripEvent.endTime;
    delete adaptedTripEvent.price;
    delete adaptedTripEvent.favorite;

    return adaptedTripEvent;
  }
}
