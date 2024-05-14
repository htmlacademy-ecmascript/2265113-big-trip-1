import dayjs from 'dayjs';
import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {UserAction, UpdateType} from '../const.js';
import { isDatesEqual } from '../utils/point.js';
import { ESC_KEY_CODE } from '../const.js';

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

  #pointsModel = null;
  #point = null;
  #pointTypes = null;
  #destinations = null;
  #mode = Mode.DEFAULT;

  constructor({eventsContainer, onDataChange, onModeChange, pointsModel}) {
    this.#eventsContainer = eventsContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#pointsModel = pointsModel;
  }

  init(point) {
    const pointsModel = this.#pointsModel;
    this.#point = point;
    this.#pointTypes = pointsModel.tripPointTypes;
    this.#destinations = pointsModel.tripDestinations;

    this.#pointComponent = new PointView({
      point: this.#point,
      allOffers: pointsModel.tripOffers,
      destinationEntity: this.#destinations.find((dest) => dest.id === point.destination),
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
      allOffers:  this.#pointsModel.tripOffers,
      destinationEntity: this.#destinations.find((dest) => dest.id === this.#point.destination),
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
      allOffers:  this.#pointsModel.tripOffers,
      destinationEntity: this.#destinations.find((dest) => dest.id === this.#point.destination),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === ESC_KEY_CODE) {
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
    this.#point = {...this.#point, isFavorite: !this.#point.isFavorite};
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, this.#point);
  };

  #handleFormSubmit = (update) => {
    const oldDate = dayjs(this.#point.dateTo).diff(this.#point.dateFrom, 'minutes');
    const newDate = dayjs(update.dateTo).diff(update.dateFrom, 'minutes');
    const isMinorUpdate = !isDatesEqual(oldDate, newDate);
    this.#point = update;

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      this.#point
    );
    //this.#replaceFormToCard();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };
}
