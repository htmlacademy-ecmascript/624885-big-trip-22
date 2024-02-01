import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createDateTimeString, checkPriceIsNumeric } from '../utils.js';
import { BLANK_TRIP_EVENT } from '../constants.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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

function createOffersTemplate(offers, offersList, type) {
  if(offersList.length === 0) {
    return '';
  }
  return offersList
    .find((item) => item.type === type)
    .offers
    .map(({id, title, price}) =>
      `<div class="event__offer-selector">
          <input
            class="event__offer-checkbox visually-hidden"
            id="${id}"
            type="checkbox"
            name="event-offer-${type}-${id}"
            ${ offers.includes(id) ? 'checked' : ''}
          >
          <label class="event__offer-label" for="${id}">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`
    ).join('');
}

function createDestinationDescriptionTemplate(currentDestination) {
  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${currentDestination?.description || ''}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${createDestinationPicturesTemplate(currentDestination?.pictures || [])}
      </div>
    </div>
  </section>`;
}

function createRollupButtonTemplate(isNewTripEvent) {
  if(isNewTripEvent) {
    return '';
  } else {
    return `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;
  }
}

function createDestinationPicturesTemplate(pictures) {
  return pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
}

function createDestinationOptionsTemplate(destinationsList) {
  return destinationsList.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

function createEditFormTemplate(state, offersList, destinationsList, isNewTripEvent) {
  const { type, startTime, endTime, price, offers, destination} = state;
  const eventTypeTemplate = createEventTypeTemplate(state);
  const startDate = createDateTimeString(startTime);
  const endDate = createDateTimeString(endTime);
  const destinationOptionsTemplate = createDestinationOptionsTemplate(destinationsList);
  const currentDestination = destinationsList.find(({id}) => id === destination);
  const offersTemplate = createOffersTemplate(offers, offersList, type);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${eventTypeTemplate}
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination?.name || ''}" list="destination-list-1">
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
        <button class="event__reset-btn" type="reset">
          ${isNewTripEvent ? 'Cancel' : 'Delete'}
        </button>
        ${createRollupButtonTemplate(isNewTripEvent)}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offersTemplate}
          </div>
        </section>
        ${currentDestination ? createDestinationDescriptionTemplate(currentDestination) : ''}
      </section>
    </form>
  </li>`;
}

export default class EditFormView extends AbstractStatefulView {
  #offersList = [];
  #destinationsList = [];
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleDeleteClick = null;
  #isNewTripEvent = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  constructor ({
    tripEvent = BLANK_TRIP_EVENT,
    offersList,
    destinationsList,
    onFormSubmit,
    onCloseClick,
    onDeleteClick,
    isNewTripEvent
  }) {
    super();
    this._setState(tripEvent);
    this.#offersList = offersList;
    this.#destinationsList = destinationsList;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#isNewTripEvent = isNewTripEvent;

    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  get template() {
    return createEditFormTemplate(this._state, this.#offersList, this.#destinationsList, this.#isNewTripEvent);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationInputHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    if(!this.#isNewTripEvent) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    }

    this.#setDatepickers();
  }

  #setDatepickers() {
    const flatpickrConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      // eslint-disable-next-line camelcase
      time_24hr: true,
    };
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...flatpickrConfig,
        defaultDate: this._state.startTime,
        maxDate: this._state.endTime,
        onClose: this.#startTimeCloseHandler
      }
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...flatpickrConfig,
        defaultDate: this._state.endTime,
        minDate: this._state.startTime,
        onClose: this.#endTimeCloseHandler
      }
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this._state);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(this._state);
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    //debugger
    //evt.target.setCustomValidity('');
    const updatedDestination = this.#destinationsList.find((value) => value.name === evt.target.value);
    // if (!updatedDestination) {
    //   evt.target.setCustomValidity('Target must be from list');
    //   return;
    // }
    this.updateElement({
      destination: updatedDestination.id.toString()
    });
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    evt.target.setCustomValidity('');
    if(!checkPriceIsNumeric(evt.target.value)) {
      evt.target.setCustomValidity('Price must be number');
      return;
    }
    this._setState({price: +evt.target.value});
  };

  #offerChangeHandler = () => {
    const updatedOffers = [];
    this.element.querySelectorAll('.event__offer-checkbox').forEach((value) => {
      if(value.checked) {
        updatedOffers.push(value.id);
      }
    });
    this._setState({
      offers: updatedOffers
    });
  };

  #startTimeCloseHandler = ([userDate]) => {
    this._setState({
      startTime: userDate
    });
    this.#datepickerTo.set('minDate', userDate);
  };

  #endTimeCloseHandler = ([userDate]) => {
    this._setState({
      endTime: userDate
    });
    this.#datepickerFrom.set('maxDate', userDate);
  };
}
