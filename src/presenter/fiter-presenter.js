import { FILTERS, UpdateType } from '../constants.js';
import { remove, render, replace } from '../framework/render.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #filterModel = null;
  #tripEventModel = null;

  constructor({filterContainer, filterModel, tripEventModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tripEventModel = tripEventModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#tripEventModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      onFilterChange: this.#handleFilterChange,
      filters: FILTERS,
      currentFilter: this.#filterModel.get()
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
