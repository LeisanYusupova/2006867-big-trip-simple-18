import { offersTypes, offerTitles  } from './const.js';
import { getRandomInteger } from '../util.js';



const allOffers = Array.from({length:offerTitles.length}, (_valuee, index) =>{
  return {
    id: index+1,
    title: offerTitles[index+1],
    price: getRandomInteger(10000)
  }
})

const offersByType = Array.from({length: offersTypes.length}, (_value, index) =>{
  return {
    type: offersTypes[index+1],
    offers: Array.from({length: getRandomInteger(0, allOffers.length)}, (_value, index) => {
      return {
        id: index+1,
        title: offerTitles[index+1],
        price: getRandomInteger(10000)
      }
    })
  }
})


export {offersByType, allOffers}
