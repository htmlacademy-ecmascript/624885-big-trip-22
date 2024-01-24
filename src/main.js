import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';
import OfferModel from './model/offer-model.js';
import TripEventModel from './model/trip-event-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';


const siteInfoElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.trip-events');
const destinationModel = new DestinationModel();
const filterModel = new FilterModel();
const tripEventModel = new TripEventModel();
const offerModel = new OfferModel();
const headerPresenter = new HeaderPresenter({ headerContainer: siteInfoElement });
const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: siteMainElement,
  tripEventModel,
  destinationModel,
  filterModel,
  offerModel
});

tripEventsPresenter.init();
headerPresenter.init();
