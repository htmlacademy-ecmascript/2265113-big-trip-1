import dayjs from 'dayjs';
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class PointsModel extends Observable {
  #pointsApiService = null;

  #points = [];
  #pointTypes = [];
  #destinations = [];
  #offers = null;

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get tripPoints() {
    return [...this.#points];
  }

  get defaultPoint() {
    return {
      price: 0,
      dateFrom: new Date().toISOString(),
      dateTo: new Date().toISOString(),
      destination: '',
      duration: 0,
      isFavorite: false,
      offers: [],
      type: 'taxi',
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  get tripPointTypes() {
    return this.#pointTypes;
  }

  get tripOffers() {
    return this.#offers;
  }

  get tripDestinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      const destinations = await this.#pointsApiService.destinations;
      const offers = await this.#pointsApiService.offers;

      this.#offers = {};
      offers.forEach((offer) => {
        this.#offers[offer.type] = offer.offers;
      });
      this.#pointTypes = Object.keys(this.#offers);
      this.#destinations = destinations;
      this.#points = points.map(this.#adaptToClient);

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

      this.#points = [
        ...this.#points.slice(0, index),
        update,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);

      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClient = (point) => ({
    price: point['base_price'],
    dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
    dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
    destination: point.destination,
    duration: dayjs(point['date_to']).diff(point['date_from'], 'minutes'),
    id: point.id,
    isFavorite: point['is_favorite'],
    offers: point.offers,
    type: point.type,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });
}
