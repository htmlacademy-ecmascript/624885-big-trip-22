import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT'
};

export default class TripEventApiService extends ApiService {
  get tripEvents() {
    return this._load({url: 'points'}).then(ApiService.parseResponse);
  }

  async updateTripEvents(tripEvent) {
    const responce = await this._load({
      url: `points/${tripEvent.id}`,
      method: Method.PUT,
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
