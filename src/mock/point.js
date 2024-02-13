import { POINT_TYPES } from '../const.js';
import { getRandomArrayElement } from '../utils.js';

export const points = [
  {
    id: '1',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '1',
    isFavorite: false,
    offers: ['1'],
    type: getRandomArrayElement(POINT_TYPES)
  },
  {
    id: '1',
    basePrice: 2100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '2',
    isFavorite: true,
    offers: ['1', '3'],
    type: getRandomArrayElement(POINT_TYPES)
  },
  {
    id: '1',
    basePrice: 3100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: ['2'],
    type: getRandomArrayElement(POINT_TYPES)
  }
];

export const getDefaultPoint = () => ({
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[0]
});

export const getRandomPoint = () => getRandomArrayElement(points);
