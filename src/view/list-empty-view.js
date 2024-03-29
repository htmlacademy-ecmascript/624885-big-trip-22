import AbstractView from '../framework/view/abstract-view.js';
import { EmptyMessage } from '../constants.js';

function createListEmptyTemplate(message) {
  return `<p class="trip-events__msg">${message}</p>

  <!--
    Значение отображаемого текста зависит от выбранного фильтра:
      * Everthing – 'Click New Event to create your first point'
      * Past — 'There are no past events now';
      * Present — 'There are no present events now';
      * Future — 'There are no future events now'.
  -->`;
}

export default class ListEmptyView extends AbstractView {
  #filter = null;

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    const message = EmptyMessage[this.#filter];
    return createListEmptyTemplate(message);
  }
}
