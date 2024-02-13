import TripPresenter from '../src/presenter/trip-presenter.js';
import PointsModel from '../src/model/point-model.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const tripPresenter = new TripPresenter({
  filtersContainer: filtersContainer,
  eventsContainer: eventsContainer,
  pointsModel
});

tripPresenter.init();
