import { render, replace } from '../framework/render.js';
import TripEventListView from '../view/trip-event-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-view.js';
import EditFormView from '../view/edit-form-view.js';

export default class TripEventsPresenter {
  #tripEventListComponent = new TripEventListView();

  #tripEventsContainer = null;
  #tripEventModel = null;
  #destinationModel = null;
  #offerModel = null;

  #tripEvents = [];
  #offersList = [];
  #destinationsList = [];

  constructor({tripEventsContainer, tripEventModel, destinationModel, offerModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripEventModel = tripEventModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  init() {
    this.#tripEvents = [...this.#tripEventModel.tripEvents];
    this.#offersList = [...this.#offerModel.offers];
    this.#destinationsList = [...this.#destinationModel.destinations];

    render(new SortView(), this.#tripEventsContainer);
    render(this.#tripEventListComponent, this.#tripEventsContainer);

    for (let i = 0; i < this.#tripEvents.length; i++) {
      const destination = this.#destinationModel.getById(this.#tripEvents[i].destination);
      this.#renderTripEvent(this.#tripEvents[i], destination);
    }
  }

  #renderTripEvent(tripEvent, destination) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const offersList = this.#offersList;
    const offersFiltered = this.#offerModel.getByType(tripEvent.type);
    const destinationsList = this.#destinationsList;

    const tripEventComponent = new TripEventView({
      tripEvent,
      offersList,
      destination,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editFormComponent = new EditFormView({
      tripEvent,
      offersFiltered,
      destinationsList,
      destination,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(editFormComponent, tripEventComponent);
    }

    function replaceFormToCard() {
      replace(tripEventComponent, editFormComponent);
    }

    render(tripEventComponent, this.#tripEventListComponent.element);
  }
}
