import AbstractView from '../framework/view/abstract-view.js';

function createListFilterTemplate(filters, currentFilter) {
  return filters.reduce(
    (markup, {type, isDisabled}) => `${markup}
      <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${type === currentFilter ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`,
    ''
  );
}

function createFilterTemplate(filters, currentFilter) {
  return `<form class="trip-filters" action="#" method="get">
    ${createListFilterTemplate(filters, currentFilter)}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
}

export default class FilterView extends AbstractView {
  #filters = null;
  #handleFilterChange = null;
  #currentFilter = null;

  constructor({filters,currentFilter, onFilterChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterChange = onFilterChange;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterChange(evt.target.value);
  };

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }
}
