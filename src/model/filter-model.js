import { FilterType } from '../constants.js';
import Observable from '../framework/observable.js';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  constructor() {
    super();
  }

  get() {
    return this.#filter;
  }

  set(updateType, update) {
    this.#filter = update;
    this._notify(updateType, update);
  }
}
