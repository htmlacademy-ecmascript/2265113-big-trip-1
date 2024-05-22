import FilterPresenter from './filter-presenter.js';
import SortView from '../view/sort-view.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortByDurationTime, sortByPrice, sortByStartDate} from '../utils/point.js';
import FilterModel from '../model/filter-model.js';
import { filter } from '../utils/filter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripPresenter {
  #filtersElement = null;
  #eventsElement = null;

  #pointsModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  #sortComponent = null;
  #filtersComponent = null;
  #noPointComponent = null;
  #loadingComponent = new LoadingView();
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #activePoint = null;
  #isLoading = true;

  #tripDestinations = [];

  constructor({filtersElement, pointsModel, eventsElement, onNewPointDestroy}) {
    this.#filtersElement = filtersElement;
    this.#eventsElement = eventsElement;
    this.#pointsModel = pointsModel;
    this.#filterModel = new FilterModel();

    this.#newPointPresenter = new NewPointPresenter({
      pointListElement: this.#eventsElement.querySelector('.trip-events__list'),
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      pointsModel: this.#pointsModel
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get tripPoints() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.tripPoints;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByDurationTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints.sort(sortByStartDate);
  }

  init() {
    this.#tripDestinations = [...this.#pointsModel.tripDestinations];

    this.#renderFilter();
    this.#renderTrip();
  }

  #renderPoint(point, pointsModel) {
    const pointPresenter = new PointPresenter({
      eventsElement: this.#eventsElement.querySelector('.trip-events__list'),
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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
          this.#pointPresenters.get(update.id).resetView();
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
          this.#newPointPresenter.destroy();
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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

    this.#activePoint = null;

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

    render(this.#sortComponent, this.#eventsElement.querySelector('.trip-events__sort-view'), RenderPosition.AFTERBEGIN);
  }

  #renderNoPoint() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#eventsElement.querySelector('.trip-events__list'), RenderPosition.AFTERBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventsElement.querySelector('.trip-events__list'), RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    const filterPresenter = new FilterPresenter({
      filterElement: this.#filtersElement,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel
    });

    filterPresenter.init();
  }
}
