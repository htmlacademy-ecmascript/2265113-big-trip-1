import { render, RenderPosition } from '../framework/render';

import PointsApiService from '../points-api-service';
import PointsModel from '../model/point-model';
import TripInfoPresenter from '../presenter/trip-info-presenter';
import TripPresenter from '../presenter/trip-presenter';
import NewPointButtonView from '../view/new-point-button-view';

import { MOCK_AUTHORIZATION, BACKEND_API_URL } from '../const';

export default class AppPresenter {
  #tripMainElement = null;
  #filtersElement = null;
  #eventsElement = null;

  #pointsModel = null;

  #apiService = null;

  #tripInfoPresenter = null;
  #tripPresenter = null;

  #newPointButtonComponent = null;

  constructor(
    tripMainElement,
    filtersElement,
    eventsElement
  ) {
    this.#tripMainElement = tripMainElement;
    this.#filtersElement = filtersElement;
    this.#eventsElement = eventsElement;
  }

  init() {
    this.#apiService = new PointsApiService(BACKEND_API_URL, MOCK_AUTHORIZATION);
    this.#pointsModel = new PointsModel(this.#apiService);

    this.#tripInfoPresenter = new TripInfoPresenter({
      pointsModel: this.#pointsModel,
      siteHeaderElement: this.#tripMainElement
    });


    this.#tripPresenter = new TripPresenter({
      filtersElement: this.#filtersElement,
      pointsModel: this.#pointsModel,
      eventsElement: this.#eventsElement,
      onNewPointDestroy: this.#handleNewPointFormClose,
    });

    this.#newPointButtonComponent = new NewPointButtonView({
      onClick: this.#handleNewPointButtonClick,
    });

    this.#tripPresenter.init();
    this.#pointsModel.init().finally(this.#renderNewPointButton);
  }

  #renderNewPointButton = () => {
    render(this.#newPointButtonComponent, this.#tripMainElement, RenderPosition.BEFOREEND);
  };

  #handleNewPointFormClose = () => {
    this.#newPointButtonComponent.element.disabled = false;
  };

  #handleNewPointButtonClick = () => {
    this.#tripPresenter.createPoint();
    this.#newPointButtonComponent.element.disabled = true;
  };

}
