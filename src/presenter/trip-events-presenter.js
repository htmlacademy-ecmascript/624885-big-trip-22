import { render } from '../framework/render.js';
import TripEventListView from '../view/trip-event-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import TripEventPresenter from './trip-event-presenter.js';
import { sortDayAscending, sortPriceAscending, sortTimeAscending, updateItem } from '../utils.js';
import SortPresenter from './sort-presenter.js';

export default class TripEventsPresenter {
  #tripEventListComponent = new TripEventListView();
  #listEmptyComponent = new ListEmptyView();

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
    const sortPresenter = new SortPresenter({
      tripEventsContainer: this.#tripEventsContainer,
      onSortChange: this.#handleSortChange
    });
    sortPresenter.init();
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
    const tripEventPresenter = new TripEventPresenter({
      tripEventListContainer: this.#tripEventListComponent.element,
      onDataChange: this.#handleTaskChange,
      onModeChange: this.#handleModeChange
    });

    tripEventPresenter.init({tripEvent, destinationModel, offerModel});
    this.#tripEventPresenters.set(tripEvent.id, tripEventPresenter);
  }

  #clearTripEventsList() {
    this.#tripEventPresenters.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenters.clear();
  }

  #handleTaskChange = (updatedTask, destinationModel, offerModel) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedTask);
    this.#tripEventPresenters
      .get(updatedTask.id)
      .init({tripEvent: updatedTask, destinationModel, offerModel});
  };

  #handleModeChange = () => {
    this.#tripEventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortChange = (el) => {
    const sortType = el.value;
    switch(sortType) {
      case 'day':
        this.#tripEvents.sort(sortDayAscending);
        break;
      case 'time':
        this.#tripEvents.sort(sortTimeAscending);
        break;
      case 'price':
        this.#tripEvents.sort(sortPriceAscending);
        break;
    }
    this.#clearTripEventsList();
    this.#renderTripEvents();
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

