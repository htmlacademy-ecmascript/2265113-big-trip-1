import TripInfoView from '../view/trip-info-view.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { sortByStartDate } from '../utils/point';
import { DESTINATIONS_ITEMS_COUNT } from '../const';
import dayjs from 'dayjs';

export default class TripInfoPresenter {
  #tripMainEventsContainer = null;
  #pointsModel = null;
  #tripInfoComponent = null;

  constructor({ pointsModel, siteHeaderElement }) {
    this.#tripMainEventsContainer = siteHeaderElement;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
  }

  init() {
    const points = this.#pointsModel.tripPoints;
    const destinations = this.#pointsModel.tripDestinations;

    if (points && points.length > 0) {
      this.#renderInfoComponent(points, destinations);
    } else if (this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
      this.#tripInfoComponent = null;
    }
  }

  #renderInfoComponent = (points, destinations) => {
    const sortedPoints = points.sort(sortByStartDate);

    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView(
      this.#getDestinationsTitle(sortedPoints, destinations),
      this.#getDurationMessage(sortedPoints),
      this.#calculateCost(sortedPoints),
    );

    if (prevTripInfoComponent) {
      replace(this.#tripInfoComponent, prevTripInfoComponent);
      remove(prevTripInfoComponent);
      return;
    }

    render(this.#tripInfoComponent, this.#tripMainEventsContainer, RenderPosition.AFTERBEGIN);
  };

  #getDestinationsTitle(points, destinations) {
    const rawNames = points.map((point) => destinations.find((destination) => destination.id === point.destination).name);

    const preparedNames = rawNames.reduce((acc, name) => {
      const previousName = acc[acc.length - 1];
      if (!previousName || previousName !== name) {
        acc.push(name);
      }
      return acc;
    }, []);

    if (preparedNames.length > DESTINATIONS_ITEMS_COUNT) {
      return `${preparedNames.at(0)}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${preparedNames.at(-1)}`;
    }
    return preparedNames.join('&nbsp;&mdash;&nbsp;');
  }

  #getDurationMessage(points) {
    const monthFirstPoint = dayjs(points.at(0).dateFrom).format('MMM');
    const monthLastPoint = dayjs(points.at(-1).dateTo).format('MMM');

    if (points.length > 0 && monthFirstPoint !== monthLastPoint) {
      return `${dayjs(points.at(0).dateFrom).format('DD MMM')}&nbsp;&mdash;&nbsp;${dayjs(points.at(-1).dateTo).format('DD MMM')}`;
    }

    if (points.length > 0 && monthFirstPoint === monthLastPoint) {
      return `${monthFirstPoint} ${dayjs(points.at(0).dateFrom).format('DD')}&nbsp;&mdash;&nbsp;${dayjs(points.at(-1).dateTo).format('DD')}`;
    }
  }

  #calculateCost(points) {
    let pointsPrice = 0;
    let offersPrice = 0;
    const offers = this.#pointsModel.tripOffers;

    points.forEach((point) => {
      point.offers.map((offerId) => {
        offersPrice += offers[point.type].find((offer) => offer.id === offerId).price;
      });
      pointsPrice += point.price;
    });

    return (pointsPrice + offersPrice).toString();
  }

  #modelEventHandler = () => {
    this.init();
  };
}
