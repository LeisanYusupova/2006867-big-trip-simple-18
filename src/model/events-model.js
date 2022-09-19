import { destinations } from '../mock/destinations.js';
import { allOffers, offersByType } from '../mock/offers.js';
import { generateWayPoints } from '../mock/waypoint.js';


export default class WayPointsModel {
  #wayPoints = generateWayPoints();
  get wayPoints() {
    return this.#wayPoints;
  }

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
