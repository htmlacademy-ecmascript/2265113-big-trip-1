import TripPresenter from '../src/presenter/trip-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render, RenderPosition } from './framework/render.js';

const siteHeaderElement = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter({
  filtersContainer,
  eventsContainer,
  onNewPointDestroy: handleNewPointFormClose
});

tripPresenter.init();

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, siteHeaderElement, RenderPosition.BEFOREEND);
