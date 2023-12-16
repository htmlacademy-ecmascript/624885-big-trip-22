import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import TripEventModel from './model/trip-event-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';


const siteInfoElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.trip-events');
const destinationsModel = new DestinationModel();
const tripEventsModel = new TripEventModel();
const offersModel = new OffersModel();
const headerPresenter = new HeaderPresenter({ headerContainer: siteInfoElement });
const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: siteMainElement,
  tripEventsModel,
  destinationsModel,
  offersModel
});

tripEventsPresenter.init();
headerPresenter.init();
