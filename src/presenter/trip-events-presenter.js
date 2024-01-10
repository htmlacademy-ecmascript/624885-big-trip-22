import { render } from '../framework/render.js';
import TripEventListView from '../view/trip-event-list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import TripEventPresenter from './trip-event-presenter.js';
import { updateItem } from '../utils.js';

export default class TripEventsPresenter {
  #tripEventListComponent = new TripEventListView();
  #listEmptyComponent = new ListEmptyView();
  #sortComponent = new SortView();

  #tripEventsContainer = null;
  #tripEventModel = null;
  #destinationModel = null;
  #offerModel = null;

  #tripEvents = [];
  #tripEventPresenters = new Map();

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
      this.#renderTripEvent(this.#tripEvents[i], this.#destinationModel, this.#offerModel);
    }
  }

  #renderTripEvent(tripEvent, destinationModel, offerModel) {
    const tripEventPresenter = new TripEventPresenter(this.#tripEventListComponent.element);

    tripEventPresenter.init({tripEvent, destinationModel, offerModel});
    this.#tripEventPresenters.set(tripEvent.id, tripEventPresenter);
  }

  #clearTripEventsList() {
    this.#tripEventPresenters.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenters.clear();
  }

  #handleTaskChange = (updatedTask) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedTask);
    this.#tripEventPresenters.get(updatedTask.id).init(updatedTask);
  };

  init() {
    this.#tripEvents = [...this.#tripEventModel.tripEvents];

    if(!this.#tripEvents.length) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();
    this.#renderTripEvents();
  }
}

