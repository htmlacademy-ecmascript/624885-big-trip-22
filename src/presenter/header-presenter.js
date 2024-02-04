
import FilterPresenter from './fiter-presenter.js';

export default class HeaderPresenter {
  #tripEventModel = null;
  #headerContainer = null;
  #filterModel = null;

  constructor({
    headerContainer,
    filterModel,
    tripEventModel
  }) {
    this.#headerContainer = headerContainer;
    this.#filterModel = filterModel;
    this.#tripEventModel = tripEventModel;
  }

  init() {
    const filterContainer = this.#headerContainer.querySelector('.trip-controls__filters');

    const filterPresenter = new FilterPresenter({
      filterContainer,
      filterModel: this.#filterModel,
      tripEventModel: this.#tripEventModel
    });
    filterPresenter.init();

  }
}
