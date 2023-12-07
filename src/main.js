import TripEventsPresenter from './presenter/trip-events-presenter.js';
import { render } from './render.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';

const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const tripEventsPresenter = new TripEventsPresenter({tripEventsContainer: siteMainElement});

render(new FilterView(), siteFiltersElement);

tripEventsPresenter.init();
