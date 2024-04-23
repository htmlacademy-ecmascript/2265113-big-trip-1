import dayjs from 'dayjs';
import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {UserAction, UpdateType} from '../const.js';
import { isDatesEqual } from '../utils/point.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #eventsContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #pointTypes = null;
  #destinations = null;
  #mode = Mode.DEFAULT;

  constructor({eventsContainer, onDataChange, onModeChange}) {
    this.#eventsContainer = eventsContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, pointTypes, destinations) {
    this.#point = point;
    this.#pointTypes = pointTypes;
    this.#destinations = destinations;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });
    render(this.#pointComponent, this.#eventsContainer);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    remove(this.#pointEditComponent);

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      pointTypes: this.#pointTypes,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onViewClick: this.#handleViewClick,
      onDeleteClick: this.#handleDeleteClick
    });

    replace(this.#pointEditComponent, this.#pointComponent);

    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange(this.#point);
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    remove(this.#pointComponent);

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleViewClick = () => {
    this.#replaceFormToCard();
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFavoriteClick = () => {
    this.#point = {...this.#point, is_favorite: !this.#point.is_favorite};
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, this.#point);
  };

  #handleFormSubmit = (update) => {
    const oldDate = dayjs(this.#point.date_to).diff(this.#point.date_from, 'minutes');
    const newDate = dayjs(update.date_to).diff(update.date_from, 'minutes');
    const isMinorUpdate = !isDatesEqual(oldDate, newDate);
    this.#point = update;

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      this.#point
    );
    this.#replaceFormToCard();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };
}
