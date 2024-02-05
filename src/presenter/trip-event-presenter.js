import { remove, render, replace } from '../framework/render.js';
import TripEventView from '../view/trip-event-view.js';
import EditFormView from '../view/edit-form-view.js';
import { Mode, UpdateType, UserAction } from '../constants.js';
import { isMinorChange } from '../utils.js';

export default class TripEventPresenter {
  #tripEvent = null;
  #destination = null;
  #tripEventComponent = null;
  #editFormComponent = null;
  #tripEventListContainer = null;
  #onDataChange = null;
  #onModeChange = null;
  #offersList = null;
  #destinationsList = null;
  #destinationModel = null;

  #mode = Mode.DEFAULT;

  constructor({tripEventListContainer, offersList, destinationModel, onDataChange, onModeChange}) {
    this.#tripEventListContainer = tripEventListContainer;
    this.#offersList = offersList;
    this.#destinationModel = destinationModel;
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
    this.#editFormComponent.resetForm(this.#tripEvent);
    replace(this.#tripEventComponent, this.#editFormComponent);
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    remove(this.#tripEventComponent);
    remove(this.#editFormComponent);
  }

  init(tripEvent) {
    const prevTripEventComponent = this.#tripEventComponent;
    const prevEditFormComponent = this.#editFormComponent;
    this.#tripEvent = tripEvent;
    this.#destination = this.#destinationModel.getById(this.#tripEvent.destination);

    this.#destinationsList = [...this.#destinationModel.destinations];

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
        this.#onDataChange(UserAction.UPDATE_EVENT, UpdateType.PATCH, this.#tripEvent);
      }
    });

    this.#editFormComponent = new EditFormView({
      tripEvent: this.#tripEvent,
      offersList: this.#offersList,
      destinationsList: this.#destinationsList,
      onFormSubmit: (updatedTripEvent) => {
        this.#onDataChange(UserAction.UPDATE_EVENT,
          isMinorChange ? UpdateType.MINOR : UpdateType.PATCH,
          updatedTripEvent
        );

      },
      onCloseClick: () => {
        this.#replaceFormToEvent();
      },
      onDeleteClick: (updatedTripEvent) => {
        this.#onDataChange(UserAction.DELETE_EVENT, UpdateType.MINOR, updatedTripEvent);
      }
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

  setSaving() {
    if(this.#mode === Mode.EDITING) {
      this.#editFormComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  }

  setDeleting() {
    if(this.#mode === Mode.EDITING) {
      this.#editFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true
      });
    }
  }

  setAborting() {
    if(this.#mode === Mode.DEFAULT) {
      this.#tripEventComponent.shake();
      return;
    }
    if(this.#mode === Mode.EDITING) {
      const resetFormState = () => {
        this.#editFormComponent.updateElement({
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        });
      };
      this.#editFormComponent.shake(resetFormState);
    }
  }
}
