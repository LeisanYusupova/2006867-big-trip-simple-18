import { allOffers } from '../mock/offers.js';
import { generateWayPoints } from '../mock/waypoint.js';

export default class WayPointsModel {
  wayPoints = generateWayPoints();
  getWayPoints = () => this.wayPoints;
  offers = allOffers;
  getOffers = () =>this.offers;
}
