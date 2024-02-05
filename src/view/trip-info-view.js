import AbstractView from '../framework/view/abstract-view.js';
import { getTripDates, getTripPrice, getTripRoute } from '../utils.js';

const createPriceTemplate = (tripEvents, offers) => tripEvents.length === 0 ? ''
  : `Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripPrice(tripEvents, offers)}</span>`;

function createTripInfoTemplate(destinations,offers,tripEvents) {
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTripRoute(tripEvents, destinations)}</h1>

      <p class="trip-info__dates">${getTripDates(tripEvents)}</p>
    </div>

    <p class="trip-info__cost">
      ${createPriceTemplate(tripEvents, offers)}
    </p>
  </section>`;
}

export default class TripInfoView extends AbstractView {
  #tripEvents = [];
  #destinations = [];
  #offers = [];
  constructor({destinations, offers, tripEvents}) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#tripEvents = tripEvents;
  }

  get template() {
    return createTripInfoTemplate(this.#destinations, this.#offers, this.#tripEvents);
  }
}
