import EditPointView from '../view/edit-point-view.js';
import FilterView from '../view/filter-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../render.js';
import {getDefaultPoint} from '../mock/point.js';
export default class TripPresenter {
  constructor({filtersContainer, eventsContainer, pointsModel}) {
    this.filtersContainer = filtersContainer;
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];
    this.tripOffers = [...this.pointsModel.getOffers()];
    this.tripDestinations = [...this.pointsModel.getDestinations()];
    this.defaultPoint = getDefaultPoint();

    render(new EditPointView({point: this.tripPoints[1], offers: this.tripOffers, destinations: this.tripDestinations}), this.eventsContainer, RenderPosition.AFTERBEGIN);
    render(new EditPointView({point: this.defaultPoint, offers: this.tripOffers, destinations: this.tripDestinations}), this.eventsContainer);
    render(new SortView(), this.eventsContainer);
    render(new FilterView(), this.filtersContainer);

    for (let i = 1; i < this.tripPoints.length; i++) {
      render(new PointView({point: this.tripPoints[i], offers: this.tripOffers, destinations: this.tripDestinations}), this.eventsContainer);
    }
  }
}
