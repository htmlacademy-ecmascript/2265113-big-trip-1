import { getDefaultPoint } from '../mock/point.js';
import dayjs from 'dayjs';
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #pointTypes = [];
  #destinations = [];
  #defaultPoint = {};

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
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

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      const destinations = await this.#pointsApiService.destinations;
      const offers = await this.#pointsApiService.offers;
      this.offers = {};
      offers.forEach((offer) => {
        this.offers[offer.type] = offer.offers;
      });
      this.#pointTypes = Object.keys(this.offers);
      this.#destinations = destinations;
      this.#points = points.map(this.#adaptToClient);
      this.#points = this.#points.map((point) => ({
        ...point,
        allOffers: this.offers,
        duration: dayjs(point.dateTo).diff(point.dateFrom, 'minutes'),
        destinationEntity: this.#destinations.find((dest) => dest.id === point.destination),
      }));
      const newPoint = [getDefaultPoint()];
      this.#defaultPoint = newPoint.map((point) => ({
        ...point,
        allOffers: this.offers,
        duration: dayjs(point.dateTo).diff(point.dateFrom, 'minutes'),
      }));
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.updatedPoint = {...updatedPoint,
        allOffers: this.offers,
        duration: dayjs(updatedPoint.dateTo).diff(updatedPoint.dateFrom, 'minutes'),
        destinationEntity: this.#destinations.find((dest) => dest.id === updatedPoint.destination)
      };
      this.#points = [
        ...this.#points.slice(0, index),
        update,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, this.updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
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

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      price: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite']
    };
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
