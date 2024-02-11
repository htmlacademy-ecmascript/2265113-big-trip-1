import TripPresenter from '../src/presenter/trip-presenter.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter({
  filtersContainer: filtersContainer,
  eventsContainer: eventsContainer
});

tripPresenter.init();
