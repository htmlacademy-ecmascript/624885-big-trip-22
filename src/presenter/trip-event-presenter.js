import { render, replace } from '../framework/render.js';
import TripEventView from '../view/trip-event-view.js';
import EditFormView from '../view/edit-form-view.js';

export default class TripEventPresenter {
  #tripEvent = null;
  #destination = null;
  #tripEventComponent = null;
  #editFormComponent = null;
  #tripEventListComponent = null;
  #offersList = null;
  #offersFiltered = null;
  #destinationsList = null;

  constructor(tripEventListComponent) {
    this.#tripEventListComponent = tripEventListComponent;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceCardToForm() {
    replace(this.#editFormComponent, this.#tripEventComponent);
  }

  #replaceFormToEvent() {
    replace(this.#tripEventComponent, this.#editFormComponent);
  }

  init({tripEvent, destinationModel, offerModel}) {
    this.#tripEvent = tripEvent;
    this.#destination = destinationModel.getById(this.#tripEvent.destination);

    this.#offersList = [...offerModel.offers];
    this.#offersFiltered = offerModel.getByType(tripEvent.type);
    this.#destinationsList = [...destinationModel.destinations];

    this.#tripEventComponent = new TripEventView({
      tripEvent: this.#tripEvent,
      offersList: this.#offersList,
      destination: this.#destination,
      onEditClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#editFormComponent = new EditFormView({
      tripEvent: this.#tripEvent,
      offersFiltered: this.#offersFiltered,
      destinationsList: this.#destinationsList,
      destination: this.#destination,
      onFormSubmit: () => {
        this.#replaceFormToEvent();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
      onCloseClick: () => {
        this.#replaceFormToEvent();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
    });
    render(this.#tripEventComponent, this.#tripEventListComponent.element);
  }
}