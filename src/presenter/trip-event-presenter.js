import { remove, render, replace } from '../framework/render.js';
import TripEventView from '../view/trip-event-view.js';
import EditFormView from '../view/edit-form-view.js';
import { Mode } from '../constants.js';

export default class TripEventPresenter {
  #tripEvent = null;
  #destination = null;
  #tripEventComponent = null;
  #editFormComponent = null;
  #tripEventListContainer = null;
  #onDataChange = null;
  #onModeChange = null;
  #offersList = null;
  #offersFiltered = null;
  #destinationsList = null;

  #mode = Mode.DEFAULT;

  constructor({tripEventListContainer, onDataChange, onModeChange}) {
    this.#tripEventListContainer = tripEventListContainer;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
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
    this.#onModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToEvent() {
    replace(this.#tripEventComponent, this.#editFormComponent);
    this.#mode = Mode.DEFAULT;
  }

  destroy() {
    remove(this.#tripEventComponent);
    remove(this.#editFormComponent);
  }

  init({tripEvent, destinationModel, offerModel}) {
    const prevTripEventComponent = this.#tripEventComponent;
    const prevEditFormComponent = this.#editFormComponent;
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
      },
      onFavoriteClick: () => {
        this.#tripEvent.favorite = !this.#tripEvent.favorite;
        this.#onDataChange(this.#tripEvent, destinationModel, offerModel);
      }
    });

    this.#editFormComponent = new EditFormView({
      tripEvent: this.#tripEvent,
      offersFiltered: this.#offersFiltered,
      destinationsList: this.#destinationsList,
      destination: this.#destination,
      onFormSubmit: (updatedTripEvent) => {
        this.#onDataChange(updatedTripEvent, destinationModel, offerModel);
        this.#replaceFormToEvent();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
      onCloseClick: () => {
        this.#replaceFormToEvent();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
    });

    if(!prevTripEventComponent || !prevEditFormComponent) {
      render(this.#tripEventComponent, this.#tripEventListContainer);
      return;
    }
    if(this.#mode === Mode.DEFAULT) {
      replace(this.#tripEventComponent, prevTripEventComponent);
    }
    if(this.#mode === Mode.EDITING) {
      replace(this.#editFormComponent, prevEditFormComponent);
    }

    remove(prevTripEventComponent);
    remove(prevEditFormComponent);
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToEvent();
    }
  }
}
