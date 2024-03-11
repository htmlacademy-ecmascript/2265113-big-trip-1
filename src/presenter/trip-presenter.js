import EditPointView from '../view/edit-point-view.js';
import FilterView from '../view/filter-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';
import PointsModel from '../model/point-model.js';

export default class TripPresenter {
  constructor({filtersContainer, eventsContainer}) {
    this.filtersContainer = filtersContainer;
    this.eventsContainer = eventsContainer;
    this.pointsModel = new PointsModel();
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];
    this.tripDestinations = [...this.pointsModel.getDestinations()];

    const tripEventsList = this.eventsContainer.querySelector('.trip-events__list');
    const tripEventsSortView = this.eventsContainer.querySelector('.trip-events__sort-view');

    render(new SortView(), tripEventsSortView);
    render(new FilterView(), this.filtersContainer);

    const editPoint = this.tripPoints[6];
    const pointTypes = this.pointsModel.getPointTypes();

    render(new EditPointView({
      point: editPoint,
      pointTypes,
      destinations: this.tripDestinations,
    }), tripEventsList);

    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new PointView({
        point: this.tripPoints[i],
      }), tripEventsList);
    }
  }
}
