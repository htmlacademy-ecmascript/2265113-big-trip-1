import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import NewFilterView from '../view/filter-view.js';
import PointView from '../view/point-view.js';
import NewSortView from '../view/sort-view.js';
import {render, RenderPosition} from '../render.js';

const POINTS_COUNT = 3;

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

export default class TripPresenter {
  init() {
    render(new EditPointView(), eventsContainer, RenderPosition.AFTERBEGIN);
    render(new AddNewPointView(), eventsContainer);
    render(new NewSortView(), eventsContainer);
    render(new NewFilterView(), filtersContainer);

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new PointView(), eventsContainer);
    }
  }
}
