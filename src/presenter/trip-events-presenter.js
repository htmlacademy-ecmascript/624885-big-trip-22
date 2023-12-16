import {render} from '../render.js';
import TripEventListView from '../view/trip-event-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-view.js';
import EditFormView from '../view/edit-form-view.js';

export default class TripEventsPresenter {
  tripEventListComponent = new TripEventListView();

  constructor({tripEventsContainer, tripEventsModel, destinationsModel}) {
    this.tripEventsContainer = tripEventsContainer;
    this.tripEventsModel = tripEventsModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.tripEvents = [...this.tripEventsModel.getTripEvents()];
    this.offersList = [...this.tripEventsModel.getOffersList()];
    this.destinationsList = [...this.destinationsModel.get()];

    render(new SortView(), this.tripEventsContainer);
    render(this.tripEventListComponent, this.tripEventsContainer);
    render(new EditFormView(this.tripEvents[0], this.offersList, this.destinationsList, this.destinationsList[0]), this.tripEventListComponent.getElement());

    for (let i = 1; i < this.tripEvents.length; i++) {
      const destination = this.destinationsModel.getById(this.tripEvents[i].destination);
      render(new TripEventView(this.tripEvents[i], this.offersList, destination), this.tripEventListComponent.getElement());
    }

    //render(new EditFormView(), this.tripEventListComponent.getElement());
  }
}
