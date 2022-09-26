import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {

  #destinationsApiService = null;
  #destinations = [];


  constructor(destinationsApiService) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }


  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      const destinations = await this.#destinationsApiService.destinations;
      this.#destinations = destinations;
      return this.#destinations;
    } catch(err) {
      this.#destinations = [];
    }
  };


  getCurrentDestination = (point) => {
    this.currentDestination = this.#destinations.find((destination) => (destination.id === point.destination));
    return this.currentDestination;
  };
}
