import { allOffers } from '../mock/offers.js';
import { generateWayPoints } from '../mock/waypoint.js';


export default class WayPointsModel {
  #wayPoints = generateWayPoints();
  get wayPoints() {
    return this.#wayPoints;
  }
  #offers = allOffers;
  get offers() {
    return this.#offers;
  }
}
