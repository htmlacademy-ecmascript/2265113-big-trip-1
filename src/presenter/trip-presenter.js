import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../framework/render.js';
import PointsModel from '../model/point-model.js';
import NoPointView from '../view/no-point-view.js';
import {generateFilter} from '../mock/filter.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';

export default class TripPresenter {
  #filtersContainer = null;
  #eventsContainer = null;
  #pointsModel = null;
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();
  #pointPresenters = new Map();

  #tripPoints = [];
  #tripDestinations = [];

  constructor({filtersContainer, eventsContainer}) {
    this.#filtersContainer = filtersContainer;
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = new PointsModel();
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.tripPoints];
    this.#tripDestinations = [...this.#pointsModel.tripDestinations];

    this.#renderTrip();
  }

  #renderPoint(point, pointTypes, destinations) {
    const pointPresenter = new PointPresenter({
      eventsContainer: this.#eventsContainer.querySelector('.trip-events__list'),
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, pointTypes, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderTrip() {
    this.#renderSort();
    this.#renderFilter();

    if (this.#tripPoints.length < 1) {
      this.#renderNoPoint();
      return;
    }

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoint(this.#tripPoints[i], this.#pointsModel.tripPointTypes, this.#tripDestinations);
    }
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#pointsModel.tripPointTypes, this.#tripDestinations);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderSort() {
    render(this.#sortComponent, this.#eventsContainer.querySelector('.trip-events__sort-view'), RenderPosition.AFTERBEGIN);
  }

  #renderNoPoint() {
    render(this.#noPointComponent, this.#eventsContainer.querySelector('.trip-events__list'), RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    const filters = generateFilter(this.#tripPoints);

    render(new FilterView({filters}), this.#filtersContainer);
  }
}
