import { generateWayPoints } from '../mock/waypoint';

export default class WayPointsModel {
  wayPoints = generateWayPoints;
  getWayPoints = () => this.wayPoints;
}
