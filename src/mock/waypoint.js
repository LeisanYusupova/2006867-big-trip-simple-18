import { getRandomInteger, createRandomIdFromRangeGenerator } from '../util.js';
import { destinations } from './destinations.js';
import {allOffers} from './offers.js';

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
  ]

  const randomIndex = getRandomInteger(0, pointTypes.length - 1);
  return pointTypes[randomIndex];
}



export const generateWayPoints = () => (
  Array.from({length: COUNT_OF_EVENTS}, (_value,index) => {
    return {
      base_price: getRandomInteger(0, 5000),
      date_from: null,
      date_to: null,
      destination: getRandomInteger(1, destinations.length),
      id: index+1,
      type: generatePointType(),
      offers: Array.from({length: 1}, (_value, index) => {
        return {
          id: getRandomInteger(1, 4),
        }
      })
    }
  })
)
