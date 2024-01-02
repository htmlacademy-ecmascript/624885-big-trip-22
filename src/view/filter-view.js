import { FILTERS } from '../constants.js';
import AbstractView from '../framework/view/abstract-view.js';

function createListFilterTemplate(filters) {
  return filters.reduce(
    (markup, {type, isChoosen, isDisabled}) => `${markup}
      <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${isChoosen ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`,
    ''
  );
}

function createFilterTemplate() {
  const filters = FILTERS;
  return `<form class="trip-filters" action="#" method="get">
    ${createListFilterTemplate(filters)}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
}

export default class FilterView extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}
