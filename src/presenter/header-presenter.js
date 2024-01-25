import {render, RenderPosition} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import FilterPresenter from './fiter-presenter.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #filterModel = null;
  #tripEventModel = null;

  constructor({ headerContainer, filterModel, tripEventModel }) {
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

    render(new TripInfoView(), this.#headerContainer, RenderPosition.AFTERBEGIN);
    render(new NewEventButtonView(), this.#headerContainer);
  }
}
