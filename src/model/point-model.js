import { points } from '../mock/point.js';
import { offers } from '../mock/offers.js';
import { destinations } from '../mock/destinations.js';
import dayjs from 'dayjs';

export default class PointsModel {
  #points = {};
  #pointTypes = [];
  #destinations = [];

  constructor() {
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
  }

  get tripPoints() {
    return this.#points;
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
}
