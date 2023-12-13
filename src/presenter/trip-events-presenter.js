import {render} from '../render.js';
import TripEventListView from '../view/trip-event-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-view.js';
import EditFormView from '../view/edit-form-view.js';

export default class TripEventsPresenter {
  tripEventListComponent = new TripEventListView();

  constructor({tripEventsContainer, tripEventsModel}) {
    this.tripEventsContainer = tripEventsContainer;
    this.tripEventsModel = tripEventsModel;
  }

  init() {
    this.tripEvents = [...this.tripEventsModel.getTripEvents()];
    this.offers = [...this.tripEventsModel.getOffers()];
    render(new SortView(), this.tripEventsContainer);
    render(this.tripEventListComponent, this.tripEventsContainer);
    render(new EditFormView(this.tripEvents[0], this.offers), this.tripEventListComponent.getElement());

    for (let i = 1; i < this.tripEvents.length; i++) {
      render(new TripEventView(this.tripEvents[i], this.offers), this.tripEventListComponent.getElement());
    }

    render(new EditFormView(), this.tripEventListComponent.getElement());
  }
}
