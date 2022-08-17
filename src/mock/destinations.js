import { getRandomInteger } from '../util.js';
import { cities, descriptions, photoDescriptions, photos } from './const.js';


const generateRandomElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
}


const destinations = Array.from({length:cities.length}, (_value, index) => {
  return {
    id: index+1,
    description: generateRandomElement(descriptions),
    name: generateRandomElement(cities),
    pictures: [
      {
        src: generateRandomElement(photos),
        description: generateRandomElement(photoDescriptions)
      }
    ]
  }
})

export {destinations};
