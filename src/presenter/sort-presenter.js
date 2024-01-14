import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import { sorts } from '../constants.js';

export default class SortPresenter {
  #sortComponent = null;
  #tripEventsContainer = null;
  #onSortChange = null;

  constructor({tripEventsContainer, onSortChange}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#onSortChange = onSortChange;
  }

  init() {
    this.#sortComponent = new SortView({
      onSortChange: this.#onSortChange,
      sorts
    });
    render(this.#sortComponent, this.#tripEventsContainer);
  }
}
