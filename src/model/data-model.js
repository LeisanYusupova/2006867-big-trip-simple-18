import { destinations } from '../mock/destinations.js';
import { allOffers, offersByType } from '../mock/offers.js';
import Observable from '../framework/observable.js';


export default class DataModel extends Observable {
  #allOffers = allOffers;
  get allOffers() {
    return this.#allOffers;
  }

  #destinations = destinations;
  get destinations() {
    return this.#destinations;
  }

  #offersByType = offersByType;
  get offersByType() {
    return this.#offersByType;
  }
}
