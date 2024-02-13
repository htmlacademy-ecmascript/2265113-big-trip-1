import {getRandomPoint} from '../mock/point.js';
import { offers } from '../mock/offers.js';
import { destinations } from '../mock/destinations.js';

const POINTS_COUNT = 4;

export default class PointsModel {
  constructor() {
    this.points = Array.from({length: POINTS_COUNT}, getRandomPoint);
    this.offers = offers;
    this.destinations = destinations;
  }

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
