import { render } from '../framework/render.js';
import TripEventListView from '../view/trip-event-list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import TripEventPresenter from './trip-event-presenter.js';

export default class TripEventsPresenter {
  #tripEventListComponent = new TripEventListView();
  #listEmptyComponent = new ListEmptyView();
  #sortComponent = new SortView();

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

  #renderSort() {
    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #renderListEmpty() {
    render(this.#listEmptyComponent, this.#tripEventsContainer);
  }

  #renderTripEvents() {
    render(this.#tripEventListComponent, this.#tripEventsContainer);

    for (let i = 0; i < this.#tripEvents.length; i++) {
      const destination = this.#destinationModel.getById(this.#tripEvents[i].destination);
      this.#renderTripEvent(this.#tripEvents[i], destination);
    }
  }

  #renderTripEvent(tripEvent, destination) {
    const tripEventPresenter = new TripEventPresenter(this.#tripEventListComponent);

    tripEventPresenter.init(tripEvent, destination, this.#offersList, this.#destinationsList, this.#offerModel);
  }

  init() {
    this.#tripEvents = [...this.#tripEventModel.tripEvents];
    this.#offersList = [...this.#offerModel.offers];
    this.#destinationsList = [...this.#destinationModel.destinations];

    if(!this.#tripEvents.length) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();
    this.#renderTripEvents();
  }
}

