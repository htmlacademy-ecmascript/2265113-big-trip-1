import { CITIES, DESCRIPTION } from '../const.js';
import { getRandomArrayElement } from '../utils.js';


export const destinations = [
  {
    id: '1',
    description: getRandomArrayElement(DESCRIPTION),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=1',
        description: getRandomArrayElement(DESCRIPTION)
      },
      {
        src: 'https://loremflickr.com/248/152?random=2',
        description: getRandomArrayElement(DESCRIPTION)
      },
      {
        src: 'https://loremflickr.com/248/152?random=3',
        description: getRandomArrayElement(DESCRIPTION)
      }
    ]
  },
  {
    id: '2',
    description: getRandomArrayElement(DESCRIPTION),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=4',
        description: getRandomArrayElement(DESCRIPTION)
      },
      {
        src: 'https://loremflickr.com/248/152?random=5',
        description: getRandomArrayElement(DESCRIPTION)
      },
    ]
  },
  {
    id: '3',
    description: getRandomArrayElement(DESCRIPTION),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=6',
        description: getRandomArrayElement(DESCRIPTION)
      }]
  }
];
