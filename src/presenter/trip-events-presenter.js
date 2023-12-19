import { render } from '../framework/render.js';
import TripEventListView from '../view/trip-event-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-view.js';
import EditFormView from '../view/edit-form-view.js';
import { BLANK_TRIP_EVENT } from '../constants.js';

export default class TripEventsPresenter {
  tripEventListComponent = new TripEventListView();

  constructor({tripEventsContainer, tripEventsModel, destinationsModel, offersModel}) {
    this.tripEventsContainer = tripEventsContainer;
    this.tripEventsModel = tripEventsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.tripEvents = [...this.tripEventsModel.get()];
    this.offersList = [...this.offersModel.get()];
    this.destinationsList = [...this.destinationsModel.get()];

    render(new SortView(), this.tripEventsContainer);
    render(this.tripEventListComponent, this.tripEventsContainer);
    render(new EditFormView(
      this.tripEvents[0],
      this.offersModel.getByType(this.tripEvents[0].type),
      this.destinationsList,
      this.destinationsList[0]
    ), this.tripEventListComponent.element);

    for (let i = 1; i < this.tripEvents.length; i++) {
      const destination = this.destinationsModel.getById(this.tripEvents[i].destination);
      render(new TripEventView(this.tripEvents[i], this.offersList, destination), this.tripEventListComponent.element);
    }

    render(new EditFormView(
      BLANK_TRIP_EVENT,
      this.offersModel.getByType(BLANK_TRIP_EVENT.type),
      this.destinationsList,
      this.destinationsList[0]
    ), this.tripEventListComponent.element);
  }
}
