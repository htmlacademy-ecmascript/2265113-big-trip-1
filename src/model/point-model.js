import { points, getDefaultPoint } from '../mock/point.js';
import { offers } from '../mock/offers.js';
import { destinations } from '../mock/destinations.js';
import dayjs from 'dayjs';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = {};
  #pointTypes = [];
  #destinations = [];
  #defaultPoint = {};

  constructor() {
    super();
    const newPoint = getDefaultPoint;
    this.offers = {};
    offers.forEach((offer) => {
      this.offers[offer.type] = offer.offers;
    });
    this.#pointTypes = Object.keys(this.offers);
    this.#destinations = destinations;
    this.#points = points.map((point) => ({
      ...point,
      allOffers: this.offers,
      duration: dayjs(point.date_to).diff(point.date_from, 'minutes'),
      destinationEntity: this.#destinations.find((dest) => dest.id === point.destination),
    }));
    this.#defaultPoint = newPoint.map((point) => ({
      ...point,
      allOffers: this.offers,
      duration: dayjs(point.date_to).diff(point.date_from, 'minutes'),
    }));
  }

  get tripPoints() {
    return this.#points;
  }

  get defaultPoint() {
    return this.#defaultPoint;
  }

  get tripPointTypes() {
    return this.#pointTypes;
  }

  get tripOffers() {
    return this.offers;
  }

  get tripDestinations() {
    return this.#destinations;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
