import AbstractView from '../framework/view/abstract-view.js';

function createFailedTemplate() {
  return '<p class="trip-events__msg">Failed to load latest route information</p>';
}

export default class FailedView extends AbstractView {
  get template() {
    return createFailedTemplate();
  }
}
