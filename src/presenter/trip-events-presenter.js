import { render } from '../framework/render.js';
import TripEventListView from '../view/trip-event-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-view.js';
import EditFormView from '../view/edit-form-view.js';
import { BLANK_TRIP_EVENT } from '../constants.js';

export default class TripEventsPresenter {
  #tripEventListComponent = new TripEventListView();

  #tripEventsContainer = null;
  #tripEventModel = null;
  #destinationModel = null;
  #offerModel = null;

  #tripEvents = [];
  #offersList = [];
  #destinationsList = [];

  constructor({tripEventsContainer, tripEventModel, destinationModel, offerModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripEventModel = tripEventModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  init() {
    this.#tripEvents = [...this.#tripEventModel.tripEvents];
    this.#offersList = [...this.#offerModel.offers];
    this.#destinationsList = [...this.#destinationModel.destinations];

    render(new SortView(), this.#tripEventsContainer);
    render(this.#tripEventListComponent, this.#tripEventsContainer);
    render(new EditFormView(
      this.#tripEvents[0],
      this.#offerModel.getByType(this.#tripEvents[0].type),
      this.#destinationsList,
      this.#destinationsList[0]
    ), this.#tripEventListComponent.element);

    for (let i = 1; i < this.#tripEvents.length; i++) {
      const destination = this.#destinationModel.getById(this.#tripEvents[i].destination);
      render(new TripEventView(this.#tripEvents[i], this.#offersList, destination), this.#tripEventListComponent.element);
    }

    render(new EditFormView(
      BLANK_TRIP_EVENT,
      this.#offerModel.getByType(BLANK_TRIP_EVENT.type),
      this.#destinationsList,
      this.#destinationsList[0]
    ), this.#tripEventListComponent.element);
  }
}
