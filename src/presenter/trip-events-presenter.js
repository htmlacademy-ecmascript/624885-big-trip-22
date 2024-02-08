import { render,remove, RenderPosition } from '../framework/render.js';
import TripEventListView from '../view/trip-event-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import LoadingView from '../view/loading-view.js';
import TripEventPresenter from './trip-event-presenter.js';
import { filtering, sorting } from '../utils.js';
import SortPresenter from './sort-presenter.js';
import { FilterType, SortType, TimeLimit, UpdateType, UserAction } from '../constants.js';
import NewTripEventPresenter from './new-trip-event-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import FailedView from '../view/failed-view.js';

export default class TripEventsPresenter {
  #tripEventListComponent = new TripEventListView();
  #loadingComponent = new LoadingView();
  #failedComponent = new FailedView();
  #listEmptyComponent = null;
  #isLoading = true;

  #tripEventsContainer = null;
  #tripEventModel = null;
  #destinationModel = null;
  #filterModel = null;
  #offerModel = null;
  #newEventButtonComponent = null;

  #tripEventPresenters = new Map();

  #currentSortType = SortType.DAY;
  #sortPresenter = null;

  #newTripEventPresenter = null;
  #onNewTripEventDestroy = null;

  #isListEmpty = false;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({
    tripEventsContainer,
    tripEventModel,
    destinationModel,
    filterModel,
    offerModel,
    onNewTripEventDestroy,
    newEventButtonComponent
  }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripEventModel = tripEventModel;
    this.#destinationModel = destinationModel;
    this.#filterModel = filterModel;
    this.#offerModel = offerModel;
    this.#onNewTripEventDestroy = onNewTripEventDestroy;
    this.#newEventButtonComponent = newEventButtonComponent;

    this.#tripEventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newTripEventPresenter = new NewTripEventPresenter({
      tripEventListContainer: this.#tripEventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewTripEventDestroy,
      destinationModel: this.#destinationModel,
      offerModel: this.#offerModel
    });
  }

  #handleNewTripEventDestroy = () => {
    if(this.#isListEmpty) {
      this.#renderListEmpty();
    }
    this.#onNewTripEventDestroy();
  };

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      tripEventsContainer: this.#tripEventsContainer,
      onSortChange: this.#handleSortChange
    });
    this.#sortPresenter.init();
  }

  #renderListEmpty() {
    this.#listEmptyComponent = new ListEmptyView(this.#filterModel.get());
    render(this.#listEmptyComponent, this.#tripEventsContainer);
    this.#isListEmpty = true;
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripEventsContainer);
  }

  #renderFailedLoadData() {
    render(this.#failedComponent, this.#tripEventsContainer);
  }

  #renderTripEvents() {
    render(this.#tripEventListComponent, this.#tripEventsContainer);
    this.#isListEmpty = false;
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

  #clearBoard() {
    this.#clearTripEventsList();
    this.#sortPresenter?.destroy();
    remove(this.#loadingComponent);
    remove(this.#listEmptyComponent);
  }

  #handleViewAction = async (actionType, updateType, data) => {
    this.#uiBlocker.block();
    switch(actionType) {
      case UserAction.UPDATE_EVENT:
        this.#tripEventPresenters.get(data.id).setSaving();
        try {
          await this.#tripEventModel.updateTripEvent(updateType, data);
        } catch(err) {
          this.#tripEventPresenters.get(data.id).setAborting();
        }
        break;
      case UserAction.CREATE_EVENT:
        this.#newTripEventPresenter.setSaving();
        try {
          await this.#tripEventModel.addTripEvent(updateType, data);
          this.#newTripEventPresenter.destroy();
        } catch(err) {
          this.#newTripEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#tripEventPresenters.get(data.id).setDeleting();
        try {
          await this.#tripEventModel.deleteTripEvent(updateType, data);
        } catch(err) {
          this.#tripEventPresenters.get(data.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #closeAllEditForms = () => {
    this.#tripEventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleModeChange = () => {
    this.#closeAllEditForms();
    this.#newTripEventPresenter?.destroy();
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#tripEventPresenters.get(data?.id)?.init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#currentSortType = SortType.DAY;
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        this.#newEventButtonComponent.element.disabled = false;
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderFailedLoadData();
        this.#newEventButtonComponent.element.disabled = true;
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

  #renderBoard() {
    if(this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if(!this.tripEvents.length) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();
    this.#renderTripEvents();
  }

  get tripEvents() {
    const filterType = this.#filterModel.get();
    const filteredTripEvents = filtering[filterType](this.#tripEventModel.tripEvents);

    return sorting[this.#currentSortType](filteredTripEvents);
  }

  init() {
    this.#renderBoard();
  }

  createTripEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#handleModeChange();
    if(this.#isListEmpty) {
      this.#clearBoard();
      render(this.#tripEventListComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
    }
    this.#newTripEventPresenter.init(this.#isListEmpty);
  }
}

