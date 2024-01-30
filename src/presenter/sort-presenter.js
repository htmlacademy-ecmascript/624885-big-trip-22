import { remove, render, replace } from '../framework/render.js';
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
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      onSortChange: this.#onSortChange,
      sorts
    });
    if(prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sortComponent, this.#tripEventsContainer);
    }
  }

  destroy() {
    remove(this.#sortComponent);
  }
}
