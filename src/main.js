import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';
import OfferModel from './model/offer-model.js';
import TripEventModel from './model/trip-event-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';
import {render} from './framework/render.js';
import TripEventApiService from './trip-event-api-service.js';
import { AUTHORIZATION, END_POINT } from './constants.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';


const tripEventApiService = new TripEventApiService(END_POINT, AUTHORIZATION);

const siteInfoElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.trip-events');
const destinationModel = new DestinationModel({tripEventApiService});
const filterModel = new FilterModel();
const offerModel = new OfferModel({tripEventApiService});
const tripEventModel = new TripEventModel({
  tripEventApiService,
  destinationModel,
  offerModel
});
const headerPresenter = new HeaderPresenter({
  headerContainer: siteInfoElement,
  filterModel,
  tripEventModel,
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: siteMainElement,
  tripEventModel,
  destinationModel,
  filterModel,
  offerModel,
  onNewTripEventDestroy: handleNewEventDestroy,
  newEventButtonComponent
});

function handleNewEventButtonClick() {
  tripEventsPresenter.createTripEvent();
  newEventButtonComponent.element.disabled = true;
}
function handleNewEventDestroy() {
  newEventButtonComponent.element.disabled = false;
}

new TripInfoPresenter({
  headerContainer: siteInfoElement,
  tripEventModel,
  destinationModel,
  offerModel
});
tripEventsPresenter.init();
headerPresenter.init();
tripEventModel.init()
  .finally(() => {
    render(newEventButtonComponent, siteInfoElement);
  });
