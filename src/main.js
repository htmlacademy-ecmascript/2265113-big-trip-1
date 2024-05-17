import TripPresenter from '../src/presenter/trip-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render, RenderPosition } from './framework/render.js';
import PointsModel from './model/point-model.js';
import PointsApiService from './points-api-service.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const AUTHORIZATION = 'Basic il5z873jh48751d';
const END_POINT = 'https://20.objects.htmlacademy.pro/big-trip';

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

new TripInfoPresenter({
  pointsModel,
  siteHeaderElement
});

const tripPresenter = new TripPresenter({
  filtersContainer,
  pointsModel,
  eventsContainer,
  onNewPointDestroy: handleNewPointFormClose
});

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


tripPresenter.init();
pointsModel.init().finally(() => {
  render(newPointButtonComponent, siteHeaderElement, RenderPosition.BEFOREEND);
});

