import { generateWayPoints } from '../mock/waypoint.js';
import Observable from '../framework/observable.js';


export default class WayPointsModel extends Observable {
  #wayPoints = generateWayPoints();
  get wayPoints() {
    return this.#wayPoints;
  }


  updateWayPoint = (updateType, update) => {
    const index = this.#wayPoints.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#wayPoints = [
      ...this.#wayPoints.slice(0, index),
      update,
      ...this.#wayPoints.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addWayPoint = (updateType, update) => {
    this.#wayPoints = [
      update,
      ...this.#wayPoints,
    ];

    this._notify(updateType, update);
  };

  deleteWayPoint = (updateType, update) => {
    const index = this.#wayPoints.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#wayPoints = [
      ...this.#wayPoints.slice(0, index),
      ...this.#wayPoints.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
