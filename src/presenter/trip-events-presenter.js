import { render } from '../framework/render.js';
import TripEventListView from '../view/trip-event-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import TripEventPresenter from './trip-event-presenter.js';
import { filtering, sorting } from '../utils.js';
import SortPresenter from './sort-presenter.js';
import { FilterType, SortType, UpdateType, UserAction } from '../constants.js';
import NewTripEventPresenter from './new-trip-event-presenter.js';

export default class TripEventsPresenter {
  #tripEventListComponent = new TripEventListView();

  #tripEventsContainer = null;
  #tripEventModel = null;
  #destinationModel = null;
  #filterModel = null;
  #offerModel = null;

  #tripEventPresenters = new Map();

  #currentSortType = SortType.DAY;

  #newTripEventPresenter = null;
  #onNewTripEventDestroy = null;

  constructor({
    tripEventsContainer,
    tripEventModel,
    destinationModel,
    filterModel,
    offerModel,
    onNewTripEventDestroy
  }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripEventModel = tripEventModel;
    this.#destinationModel = destinationModel;
    this.#filterModel = filterModel;
    this.#offerModel = offerModel;
    this.#onNewTripEventDestroy = onNewTripEventDestroy;

    this.#tripEventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newTripEventPresenter = new NewTripEventPresenter({
      tripEventListContainer: this.#tripEventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#onNewTripEventDestroy,
      destinationModel: this.#destinationModel,
      offerModel: this.#offerModel
    });
  }

  #renderSort() {
    const sortPresenter = new SortPresenter({
      tripEventsContainer: this.#tripEventsContainer,
      onSortChange: this.#handleSortChange
    });
    sortPresenter.init();
  }

  #renderListEmpty() {
    render(new ListEmptyView(this.#filterModel.get), this.#tripEventsContainer);
  }

  #renderTripEvents() {
    render(this.#tripEventListComponent, this.#tripEventsContainer);

    for (let i = 0; i < this.tripEvents.length; i++) {
      this.#renderTripEvent(this.tripEvents[i], this.#destinationModel, this.#offerModel);
    }
  }

  #renderTripEvent(tripEvent, destinationModel, offerModel) {
    const tripEventPresenter = new TripEventPresenter({
      tripEventListContainer: this.#tripEventListComponent.element,
      offersList: offerModel.offers,
      destinationModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    tripEventPresenter.init(tripEvent);
    this.#tripEventPresenters.set(tripEvent.id, tripEventPresenter);
  }

  #clearTripEventsList = () => {
    this.#tripEventPresenters.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenters.clear();
  };

  #handleViewAction = (actionType, updateType, data) => {
    switch(actionType) {
      case UserAction.UPDATE_EVENT:
        this.#tripEventModel.updateTripEvent(updateType, data);
        break;
      case UserAction.CREATE_EVENT:
        this.#tripEventModel.addTripEvent(updateType, data);
        break;
      case UserAction.DELETE_EVENT:
        this.#tripEventModel.deleteTripEvent(updateType, data);
        break;
    }
  };

  #closeAllEditForms = () => {
    this.#tripEventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleModeChange = () => {
    this.#closeAllEditForms();
    this.#newTripEventPresenter.destroy();
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#tripEventPresenters.get(data?.id)?.init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripEventsList();
        this.#renderTripEvents();
        break;
      case UpdateType.MAJOR:
        this.#currentSortType = SortType.DAY;
        this.#clearTripEventsList();
        this.#renderTripEvents();
        break;
    }

  };

  #handleSortChange = (el) => {
    const sortType = el.value;
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearTripEventsList();
    this.#renderTripEvents();
  };

  get tripEvents() {
    const filterType = this.#filterModel.get();
    const filteredTripEvents = filtering[filterType](this.#tripEventModel.tripEvents);

    return sorting[this.#currentSortType](filteredTripEvents);
  }

  init() {
    if(!this.tripEvents.length) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();
    this.#renderTripEvents();
  }

  createTripEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#handleModeChange();
    this.#newTripEventPresenter.init();
  }
}

