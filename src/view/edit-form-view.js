import AbstractView from '../framework/view/abstract-view.js';
import { createDateTimeString } from '../utils.js';
import { BLANK_TRIP_EVENT } from '../constants.js';

function createEventTypeTemplate(tripEvent) {
  const { type } = tripEvent;
  return `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>

        <div class="event__type-item">
          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
        </div>
      </fieldset>
    </div>
  </div>`;
}

function createOffersTemplate(offers, offersList) {
  return offersList.offers.map(({id, title, price, type}) =>
    `<div class="event__available-offers">
      <div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          id="event-offer-${type}-${id}"
          type="checkbox"
          name="event-offer-${type}-${id}"
          ${ offers.includes(id) ? 'checked' : ''}
        >
        <label class="event__offer-label" for="event-offer-${type}-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`
  ).join('');
}

function createDestinationPicturesTemplate(pictures) {
  return pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
}

function createDestinationOptionsTemplate(destinationsList) {
  return destinationsList.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

function createEditFormTemplate(tripEvent, currentOffersList, destinationsList, currentDestination) {
  const { type, startTime, endTime, price, offers} = tripEvent;
  const eventTypeTemplate = createEventTypeTemplate(tripEvent);
  const startDate = createDateTimeString(startTime);
  const endDate = createDateTimeString(endTime);
  const destinationOptionsTemplate = createDestinationOptionsTemplate(destinationsList);
  const offersTemplate = createOffersTemplate(offers, currentOffersList);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${eventTypeTemplate}
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination.name || ''}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationOptionsTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          ${offersTemplate}
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${currentDestination.description || ''}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${createDestinationPicturesTemplate(currentDestination.pictures || [])}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;
}

export default class EditFormView extends AbstractView {
  #tripEvent = null;
  #offersFiltered = null;
  #destinationsList = null;
  #currentDestination = null;
  #handleFormSubmit = null;

  constructor ({tripEvent = BLANK_TRIP_EVENT, offersFiltered = [], destinationsList, destination = {}, onFormSubmit}) {
    super();
    this.#tripEvent = tripEvent;
    this.#offersFiltered = offersFiltered;
    this.#destinationsList = destinationsList;
    this.#currentDestination = destination;
    this.#handleFormSubmit = onFormSubmit;

    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createEditFormTemplate(this.#tripEvent, this.#offersFiltered, this.#destinationsList, this.#currentDestination);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
}
