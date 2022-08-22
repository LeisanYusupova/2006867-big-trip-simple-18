import { getRandomInteger } from '../util.js';
import { destinations } from './destinations.js';

const COUNT_OF_EVENTS = 6;

const generatePointType = () => {
  const pointTypes = [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant'
  ];

  const randomIndex = getRandomInteger(0, pointTypes.length - 1);
  return pointTypes[randomIndex];
};


export const generateWayPoints = () => (
  Array.from({length: COUNT_OF_EVENTS}, (_value,index) => {
    return {
      basePrice: getRandomInteger(0, 5000),
      dateFrom: '2019-07-10T22:55:56.845Z',
      dateTo: '2019-07-11T11:22:13.375Z',
      destination: getRandomInteger(1, destinations.length),
      id: index + 1,
      type: generatePointType(),
      offers: Array.from({length: 2}, (_value, index) => {
        return {
          id: getRandomInteger(1, 4),
        };
      })
    };
  })
);
