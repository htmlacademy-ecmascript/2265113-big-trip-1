import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import FilterView from '../view/filter-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../render.js';

const POINTS_COUNT = 3;
export default class TripPresenter {
  constructor({filtersContainer, eventsContainer}) {
    this.filtersContainer = filtersContainer;
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(new EditPointView(), this.eventsContainer, RenderPosition.AFTERBEGIN);
    render(new AddNewPointView(), this.eventsContainer);
    render(new SortView(), this.eventsContainer);
    render(new FilterView(), this.filtersContainer);

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new PointView(), this.eventsContainer);
    }
  }
}
