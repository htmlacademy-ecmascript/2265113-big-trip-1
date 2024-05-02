import FilterPresenter from './filter-presenter.js';
import SortView from '../view/sort-view.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortByTime, sortByPrice} from '../utils/point.js';
import FilterModel from '../model/filter-model.js';
import { filter } from '../utils/filter.js';
import LoadingView from '../view/loading-view.js';

export default class TripPresenter {
  #filtersContainer = null;
  #eventsContainer = null;
  #pointsModel = null;
  #activePoint = null;
  #sortComponent = null;
  #filtersComponent = null;
  #noPointComponent = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #filterModel = null;
  #isLoading = true;
  #loadingComponent = new LoadingView();

  #tripDestinations = [];

  constructor({filtersContainer, pointsModel, eventsContainer, onNewPointDestroy}) {
    this.#filtersContainer = filtersContainer;
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = new FilterModel();

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: eventsContainer,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      pointsModel: this.#pointsModel
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get tripPoints() {
    this.#filterType = this.#filterModel.filter;
    const points = [...this.#pointsModel.tripPoints];
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints;
  }

  init() {
    this.#tripDestinations = [...this.#pointsModel.tripDestinations];

    this.#renderFilter();
    this.#renderTrip();
  }

  #renderPoint(point, pointsModel) {
    const pointPresenter = new PointPresenter({
      eventsContainer: this.#eventsContainer.querySelector('.trip-events__list'),
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      pointsModel: pointsModel
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderTrip() {
    this.#renderSort();

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderPoints();
  }

  #renderPoints() {
    const points = this.tripPoints;

    if (points.length < 1) {
      this.#renderNoPoint();
      return;
    }

    for (let i = 0; i < this.tripPoints.length; i++) {
      this.#renderPoint(points[i], this.#pointsModel);
    }
  }

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip();
        this.#renderTrip({resetSortType: true});
        break;
      case UpdateType.INIT:
        this.#clearTrip();
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTrip();
        break;
    }
  };

  #handleModeChange = (point) => {
    this.#newPointPresenter.destroy();

    if (this.#activePoint) {
      this.#pointPresenters.get(this.#activePoint.id).resetView();
    }
    this.#activePoint = point;
  };

  #clearTrip({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#filtersComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#eventsContainer.querySelector('.trip-events__sort-view'), RenderPosition.AFTERBEGIN);
  }

  #renderNoPoint() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#eventsContainer.querySelector('.trip-events__list'), RenderPosition.AFTERBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventsContainer.querySelector('.trip-events__list'), RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#filtersContainer,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel
    });

    filterPresenter.init();
  }
}
