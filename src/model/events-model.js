
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import { isPointFuture } from '../util.js';


export default class WayPointsModel extends Observable {

  #pointsApiService = null;
  #wayPoints = [];
  #availabilityFuturePoints = false;

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get wayPoints() {
    return this.#wayPoints;
  }

  get availabilityFuturePoints() {
    return this.#availabilityFuturePoints;
  }

  init = async () => {
    try {
      const wayPoints = await this.#pointsApiService.wayPoints;
      this.#wayPoints = wayPoints.map(this.#adaptToClient);
      console.log(this.#wayPoints);
    } catch(err) {
      this.#wayPoints = [];
    }
    this._notify(UpdateType.INIT);
  };



  updateWayPoint = async(updateType, update) => {
    const index = this.#wayPoints.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedWaypoint = this.#adaptToClient(response);

    this.#wayPoints = [
      ...this.#wayPoints.slice(0, index),
      updatedWaypoint,
      ...this.#wayPoints.slice(index + 1),
    ];

    this._notify(updateType, updatedWaypoint);
  } catch(err) {
    throw new Error('Can\'t update task');
  }
};


  addWayPoint = async (updateType, update) => {

    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#wayPoints = [
        newPoint,
        ...this.#wayPoints,
      ];

      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  };

  deleteWayPoint = async (updateType, update) => {
    const index = this.#wayPoints.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }
    try {
      await this.#pointsApiService.deletePoint(update);
      this.#wayPoints = [
        ...this.#wayPoints.slice(0, index),
        ...this.#wayPoints.slice(index + 1),
      ];
      this._notify(updateType);
    }  catch(err) {
      throw new Error('Can\'t delete task');
    }
  };

  #checkPointIsFuture = (point) => isPointFuture(point.dateFrom);

  #adaptToClient = (point) => {
    const adaptedPoint = {...point,
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      basePrice: point['base_price']
    };
    if (this.#checkPointIsFuture(adaptedPoint)) {
      this.#availabilityFuturePoints = true;
    }
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];


    return adaptedPoint;
  };
}
