import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';
import OfferModel from './model/offer-model.js';
import TripEventModel from './model/trip-event-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';
import {render} from './framework/render.js';
import TripEventApiService from './trip-event-api-service.js';

const AUTHORIZATION = 'Basic BvRk6qmoo5l0XSyz';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const siteInfoElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.trip-events');
const destinationModel = new DestinationModel();
const filterModel = new FilterModel();
const tripEventModel = new TripEventModel({
  tripEventApiService: new TripEventApiService(END_POINT, AUTHORIZATION)
});
const offerModel = new OfferModel();
const headerPresenter = new HeaderPresenter({
  headerContainer: siteInfoElement,
  filterModel,
  tripEventModel
});
const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: siteMainElement,
  tripEventModel,
  destinationModel,
  filterModel,
  offerModel,
  onNewTripEventDestroy: handleNewEventDestroy
});

tripEventsPresenter.init();
headerPresenter.init();

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});
function handleNewEventButtonClick() {
  tripEventsPresenter.createTripEvent();
  newEventButtonComponent.element.disabled = true;
}
function handleNewEventDestroy() {
  newEventButtonComponent.element.disabled = false;
}

render(newEventButtonComponent, siteInfoElement);
