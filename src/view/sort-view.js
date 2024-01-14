import AbstractView from '../framework/view/abstract-view.js';

function createListSortTemplate(sorts) {
  return sorts.reduce(
    (markup, {type, isChoosen, isDisabled}) => `${markup}
      <div class="trip-sort__item trip-sort__item--${type}">
        <input
          id="sort-${type}"
          class="trip-sort__input visually-hidden"
          type="radio"
          name="trip-sort"
          data="${type}"
          value="${type}"
          ${isChoosen ? 'checked' : ''}
          ${isDisabled ? 'disabled' : ''}
        >
        <label class="trip-sort__btn" for="sort-${type}">${type}</label>
      </div>`,
    ''
  );
}

function createSortTemplate(sorts) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createListSortTemplate(sorts)}
  </form>`;
}

export default class SortView extends AbstractView {
  #handleSortChange = null;
  #sorts = [];

  constructor({onSortChange, sorts}) {
    super();
    this.#handleSortChange = onSortChange;
    this.#sorts = sorts;

    this.element.addEventListener('change', this.#sortChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#sorts);
  }

  #sortChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortChange(evt.target);
  };
}
