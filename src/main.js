import TripEventsPresenter from './presenter/trip-events-presenter.js';
import { RenderPosition, render } from './render.js';
import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';

const siteInfoElement = document.querySelector('.trip-main');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const tripEventsPresenter = new TripEventsPresenter({tripEventsContainer: siteMainElement});

render(new TripInfoView(), siteInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteFiltersElement);

tripEventsPresenter.init();
