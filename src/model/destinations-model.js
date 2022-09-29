import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class DestinationsModel extends Observable {

  #pointsApiService = null;
  #destinations = [];


  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }


  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      this.#destinations  = await  this.#pointsApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }finally {
      this._notify(UpdateType.INIT);
    }
  };


  getCurrentDestination = (point) => {
    this.currentDestination = this.#destinations.find((destination) => (destination.id === point.destination));
    return this.currentDestination;
  };
}
