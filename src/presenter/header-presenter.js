import {render, RenderPosition} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';

export default class HeaderPresenter {
  #headerContainer = null;

  constructor({ headerContainer }) {
    this.#headerContainer = headerContainer;
  }

  init() {
    const filterElement = this.#headerContainer.querySelector('.trip-controls__filters');
    render(new TripInfoView(), this.#headerContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView(), filterElement);
  }
}
