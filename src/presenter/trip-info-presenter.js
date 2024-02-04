import {render, RenderPosition, replace, remove} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
export default class TripInfoPresenter {
  #headerContainer = null;
  #tripInfoComponent = null;
  #tripEventModel = null;
  #destinationModel = null;
  #offerModel = null;

  constructor({
    headerContainer,
    tripEventModel,
    destinationModel,
    offerModel
  }) {
    this.#headerContainer = headerContainer;
    this.#tripEventModel = tripEventModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;

    this.#tripEventModel.addObserver(this.#modelEventHandler);
  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView({
      destinations: this.#destinationModel.destinations,
      offers: this.#offerModel.offers,
      tripEvents: this.#tripEventModel.tripEvents
    });
    if(!prevTripInfoComponent) {
      render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #modelEventHandler = () => {
    this.init();
  };
}
