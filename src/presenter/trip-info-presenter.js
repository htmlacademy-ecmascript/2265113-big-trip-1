import TripInfoView from '../view/trip-info-view.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { sortPointsByDay, getCheckedOffers } from '../utils/trip-info';
import { DESTINATIONS_ITEMS_LENGTH } from '../const';
import dayjs from 'dayjs';

export default class TripInfoPresenter {
  #tripMainEventsContainer = null;
  #pointsModel = null;
  #tripInfoComponent = null;
  #sortedPoints = null;

  constructor({ pointsModel, siteHeaderElement }) {
    this.#tripMainEventsContainer = siteHeaderElement;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;

    if (this.#pointsModel.tripPoints && this.#pointsModel.tripPoints.length !== 0) {
      this.#sortedPoints = this.#pointsModel.tripPoints.sort(sortPointsByDay);

      this.#tripInfoComponent = new TripInfoView({
        isEmpty: false,
        title: this.#getTripTitle(this.#pointsModel.tripPoints, this.#pointsModel.tripDestinations),
        duration: this.#getTripDuration(this.#pointsModel.tripPoints),
        cost: this.#getTripCost()
      });

      if (prevTripInfoComponent === null) {
        render(this.#tripInfoComponent, this.#tripMainEventsContainer, RenderPosition.AFTERBEGIN);
        return;
      }

      replace(this.#tripInfoComponent, prevTripInfoComponent);
      remove(prevTripInfoComponent);
    } else {
      this.#tripInfoComponent = new TripInfoView({ isEmpty: true });
      render(this.#tripInfoComponent, this.#tripMainEventsContainer, RenderPosition.AFTERBEGIN);
      remove(prevTripInfoComponent);
    }
  }

  #getTripTitle() {
    const allDestinationNames = this.#pointsModel.tripPoints.sort(sortPointsByDay).map((point) => this.#pointsModel.tripDestinations.find((destination) => destination.id === point.destination).name);
    const destinationNames = allDestinationNames.reduce((newDestinationNames, currentDestinationName) => {
      const previousDestinationName = newDestinationNames[newDestinationNames.length - 1];

      if (!previousDestinationName || previousDestinationName !== currentDestinationName) {
        newDestinationNames.push(currentDestinationName);
      }

      return newDestinationNames;
    }, []);

    return destinationNames.length <= DESTINATIONS_ITEMS_LENGTH ? destinationNames.join('&nbsp;&mdash;&nbsp;') : `${destinationNames.at(0)}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${destinationNames.at(-1)}`;
  }

  #getTripDuration() {
    const sortedPoints = this.#pointsModel.tripPoints.sort(sortPointsByDay);
    const monthFirstPoint = dayjs(sortedPoints.at(0).dateFrom).format('MMM');
    const monthLastPoint = dayjs(sortedPoints.at(-1).dateTo).format('MMM');

    if (sortedPoints.length > 0 && monthFirstPoint !== monthLastPoint) {
      return `${dayjs(sortedPoints.at(0).dateFrom).format('DD MMM')}&nbsp;&mdash;&nbsp;${dayjs(sortedPoints.at(-1).dateTo).format('DD MMM')}`;
    }
    if (sortedPoints.length > 0 && monthFirstPoint === monthLastPoint) {
      return `${monthFirstPoint} ${dayjs(sortedPoints.at(0).dateFrom).format('DD')}&nbsp;&mdash;&nbsp;${dayjs(sortedPoints.at(-1).dateTo).format('DD')}`;
    }

    return '';
  }

  #getTripCost() {
    let offers = null;
    let price = 0;
    let offersPrice = 0;

    this.#sortedPoints.forEach((point) => {
      offers = getCheckedOffers(point.offers, this.#pointsModel.getByType(point.type));

      offers.forEach((offer) => {
        offersPrice += offer.price;
      });

      price += point.price;
    });

    price += offersPrice;

    return price.toString();
  }

  #modelEventHandler = () => {
    this.init();
  };
}
