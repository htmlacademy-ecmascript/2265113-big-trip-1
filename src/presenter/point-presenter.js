import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

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
    this.#handleDataChange(this.#point);
  };

  #handleFormSubmit = (point) => {
    this.#point = point;
    this.#handleDataChange(this.#point);
    this.#replaceFormToCard();
  };
}
