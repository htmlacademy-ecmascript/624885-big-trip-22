import AbstractView from '../framework/view/abstract-view';

function createNewEventButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class NewEventButtonView extends AbstractView {
  #onClick = null;

  constructor({onClick}) {
    super();
    this.#onClick = onClick;

    this.element.addEventListener('click', this.#handleClick);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #handleClick = (evt) => {
    evt.preventDefault();
    this.#onClick();
  };
}
