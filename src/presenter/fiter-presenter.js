import { UpdateType } from '../constants.js';
import { remove, render, replace } from '../framework/render.js';
import { filtering } from '../utils.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #filterModel = null;
  #tripEventModel = null;
  #currentFilter = null;

  constructor({filterContainer, filterModel, tripEventModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tripEventModel = tripEventModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#tripEventModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const tripEvents = this.#tripEventModel.tripEvents;

    return Object.entries(filtering).map(([filterType, filterTripPoints]) => ({
      type: filterType,
      isChecked: filterType === this.#currentFilter,
      isDisabled: !filterTripPoints(tripEvents).length
    }));
  }

  init() {
    this.#currentFilter = this.#filterModel.get();
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      onFilterChange: this.#handleFilterChange,
      filters: this.filters,
      currentFilter: this.#currentFilter
    });
    if(prevFilterComponent) {
      replace(this.#filterComponent, prevFilterComponent);
      remove(prevFilterComponent);
    } else {
      render(this.#filterComponent, this.#filterContainer);
    }
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterChange = (filter) => {
    if(this.#filterModel.get === filter) {
      return;
    }
    this.#filterModel.set(UpdateType.MAJOR, filter);
  };

  destroy() {
    remove(this.#filterComponent);
  }
}
