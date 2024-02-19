import { points } from '../mock/point.js';
import { offers } from '../mock/offers.js';
import { destinations } from '../mock/destinations.js';

export default class PointsModel {
  constructor() {
    this.offers = {};
    offers.forEach((offer) => {
      this.offers[offer.type] = offer.offers;
    });
    this.pointTypes = Object.keys(this.offers);
    this.destinations = destinations;
    this.points = points.map((point) => ({
      ...point,
      destinationEntity: this.destinations.find((dest) => dest.id === point.destination),
      offersEntity: this.offers[point.type],
    }));
  }

  getPoints() {
    return this.points;
  }

  getPointTypes() {
    return this.pointTypes;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
