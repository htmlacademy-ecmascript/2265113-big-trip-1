import AppPresenter from './presenter/app-presenter';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const appPresenter = new AppPresenter(
  tripMainElement,
  filtersElement,
  eventsElement
);

appPresenter.init();


