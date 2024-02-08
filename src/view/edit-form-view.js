import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createDateTimeString, checkPriceIsNumeric, capitalize } from '../utils.js';
import { BLANK_TRIP_EVENT, TripEventTypes } from '../constants.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

function createEventTypeTemplate(type, currentType) {
  return `<div class="event__type-item">
    <input
      id="event-type-${type}-1"
      class="event__type-input visually-hidden"
      type="radio" name="event-type"
      value="${type}"
      ${type === currentType ? 'checked' : ''}
    >
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalize(type)}</label>
  </div>`;
}

function createEventTypesTemplate(tripEvent) {
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

        ${Object.values(TripEventTypes).map((value) => createEventTypeTemplate(value, type)).join('')}
      </fieldset>
    </div>
  </div>`;
}

function createOffersTemplate(offers, offersList, type) {
  const currentOffersList = offersList.find((item) => item.type === type).offers;
  if(currentOffersList.length === 0) {
    return '';
  }
  const offersListTemplate = currentOffersList
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
  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersListTemplate}
      </div>
    </section`;
}

function createDestinationDescriptionTemplate(currentDestination) {
  if(currentDestination.description === '') {
    return '';
  }
  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${currentDestination?.description || ''}</p>
    ${createDestinationPicturesTemplate(currentDestination?.pictures || [])}
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
  if(pictures.length === 0) {
    return '';
  }
  const picturesTape = pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
  return `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${picturesTape}
      </div>
    </div>`;
}

function createDestinationOptionsTemplate(destinationsList) {
  return destinationsList.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

function createEditFormTemplate(state, offersList, destinationsList, isNewTripEvent) {
  const { type, startTime, endTime, price, offers, destination, isDeleting, isSaving} = state;
  const eventTypeTemplate = createEventTypesTemplate(state);
  const startDate = createDateTimeString(startTime);
  const endDate = createDateTimeString(endTime);
  const destinationOptionsTemplate = createDestinationOptionsTemplate(destinationsList);
  const currentDestination = destinationsList.find(({id}) => id === destination);
  const offersTemplate = createOffersTemplate(offers, offersList, type);
  const secondButtonName = isNewTripEvent ? 'Cancel' : 'Delete';

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${eventTypeTemplate}
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input
            class="event__input  event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${he.encode(currentDestination?.name || '')}"
            list="destination-list-1"
          >
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
          <input
            class="event__input  event__input--price"
            id="event-price-1"
            type="text"
            name="event-price"
            value="${he.encode(String(price))}"
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">
        ${isSaving ? 'Saving...' : 'Save'}
        </button>
        <button class="event__reset-btn" type="reset">
          ${isDeleting ? 'Deleting...' : secondButtonName}
        </button>
        ${createRollupButtonTemplate(isNewTripEvent)}
      </header>
      <section class="event__details">
        ${offersTemplate}
        ${currentDestination ? createDestinationDescriptionTemplate(currentDestination) : ''}
      </section>
    </form>
  </li>`;
}

export default class EditFormView extends AbstractStatefulView {
  #tripEvent = null;
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
    this.#tripEvent = tripEvent;
    this._setState(EditFormView.parseTripEventToState(tripEvent));
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
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);
    if(!this.#isNewTripEvent) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    }

    this.#setDatepickers();
  }

  resetForm(tripEvent) {
    this.updateElement(EditFormView.parseTripEventToState(tripEvent));
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
    this.#handleFormSubmit(EditFormView.parseStateToTripEvent(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditFormView.parseStateToTripEvent(this._state));
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    evt.target.setCustomValidity('');
    const updatedDestination = this.#destinationsList.find((value) => value.name === evt.target.value);
    if (!updatedDestination) {
      evt.target.setCustomValidity('Target must be from list');
      return;
    }
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

  static parseTripEventToState(tripEvent) {
    return {
      ...tripEvent,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToTripEvent(state) {
    const tripEvent = {...state};

    delete tripEvent.isDisabled;
    delete tripEvent.isSaving;
    delete tripEvent.isDeleting;

    return tripEvent;
  }
}
