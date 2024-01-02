import AbstractView from '../framework/view/abstract-view.js';
import { EmptyMessage } from '../constants.js';

import { FilterType } from '../constants.js';

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
  get template() {
    const message = EmptyMessage[FilterType.EVERYTHING];
    return createListEmptyTemplate(message);
  }
}
