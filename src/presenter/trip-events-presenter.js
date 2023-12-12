import {render} from '../render.js';
import TripEventListView from '../view/trip-event-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-view.js';
import EditFormView from '../view/edit-form-view.js';
import AddFormView from '../view/add-form-view.js';

export default class TripEventsPresenter {
  tripEventListComponent = new TripEventListView();

  constructor({tripEventsContainer, tripEventsModel}) {
    this.tripEventsContainer = tripEventsContainer;
    this.tripEventsModel = tripEventsModel;
  }

  init() {
    this.tripEvents = [...this.tripEventsModel.getTripEvents()];
    render(new SortView(), this.tripEventsContainer);
    render(this.tripEventListComponent, this.tripEventsContainer);
    render(new EditFormView(), this.tripEventListComponent.getElement());

    for (let i = 0; i < this.tripEvents.length; i++) {
      render(new TripEventView(this.tripEvents[i]), this.tripEventListComponent.getElement());
    }

    render(new AddFormView(), this.tripEventListComponent.getElement());
  }
}
