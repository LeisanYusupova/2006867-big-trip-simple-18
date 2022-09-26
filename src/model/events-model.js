
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';


export default class WayPointsModel extends Observable {

  #pointsApiService = null;
  #wayPoints = [];

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get wayPoints() {
    return this.#wayPoints;
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

  #adaptToClient = (point) => {
    const adaptedPoint = {...point,
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      basePrice: point['base_price'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];


    return adaptedPoint;
  };
}
