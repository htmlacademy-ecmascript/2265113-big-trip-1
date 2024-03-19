import EditPointView from '../view/edit-point-view.js';
import FilterView from '../view/filter-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import {render, replace} from '../framework/render.js';
import PointsModel from '../model/point-model.js';
import NoPointView from '../view/no-point-view.js';
import {generateFilter} from '../mock/filter.js';

export default class TripPresenter {
  #filtersContainer = null;
  #eventsContainer = null;
  #pointsModel = null;

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

  #renderPoint(point) {
    const pointTypes = this.#pointsModel.tripPointTypes;
    const destinations = this.#tripDestinations;

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const editPointComponent = new EditPointView({
      point,
      pointTypes,
      destinations,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(editPointComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#eventsContainer.querySelector('.trip-events__list'));
  }

  #renderTrip() {
    const tripEventsSortView = this.#eventsContainer.querySelector('.trip-events__sort-view');
    const filters = generateFilter(this.#tripPoints);

    render(new SortView(), tripEventsSortView);
    render(new FilterView({filters}), this.#filtersContainer);

    if (this.#tripPoints.length < 1) {
      render(new NoPointView(), this.#eventsContainer.querySelector('.trip-events__list'));
      return;
    }

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoint(this.#tripPoints[i]);
    }
  }
}
