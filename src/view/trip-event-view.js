import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDate, createTimeString, getDuration } from '../utils.js';

function createOffersTemplate(offersFiltered) {
  return offersFiltered.map(({title, price}) =>
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`
  ).join('');
}

function createTripEventTemplate(tripEvent, offersList, destination) {
  const {type, startTime, endTime, price, offers, favorite } = tripEvent;
  const offersFiltered = offersList.find((item) => item.type === type);
  const offersActivated = offersFiltered.offers.filter((item) => offers.includes(item.id));
  const { name } = destination;
  const offersTemplate = createOffersTemplate(offersActivated);
  const isFavorite = favorite ? 'event__favorite-btn--active' : '';
  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${startTime}">${humanizeEventDate(startTime)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T12:25">${createTimeString(startTime)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T13:35">${createTimeString(endTime)}</time>
        </p>
        <p class="event__duration">${getDuration(startTime, endTime)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersTemplate}
      </ul>
      <button class="event__favorite-btn ${isFavorite}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
}

export default class TripEventView extends AbstractView {
  #tripEvent = null;
  #offersList = [];
  #destination = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({tripEvent, offersList, destination, onEditClick, onFavoriteClick}) {
    super();
    this.#tripEvent = tripEvent;
    this.#offersList = offersList;
    this.#destination = destination;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripEventTemplate(this.#tripEvent, this.#offersList, this.#destination);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
