import Observable from '../framework/observable';
import {UpdateType} from '../const.js';

export default class OffersModel extends Observable {

  #pointsApiService = null;
  #offersByType = null;


  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get offersByType() {
    return this.#offersByType;
  }

  init = async () => {
    try {
      this.#offersByType = await this.#pointsApiService.offers;
    } catch(err) {
      this.#offersByType = [];
    } finally {
      this._notify(UpdateType.INIT);
    }
  };


  getCurrentOffersByType = (point) => this.#offersByType.find((offer) => offer.type === point.type);


  getSelectedOffers = (point) => {
    const currentOffersByType = this.getCurrentOffersByType(point);
    if (currentOffersByType) {
      const selectedOffers = currentOffersByType.offers.filter((offer) => point.offers.includes(offer.id));
      return selectedOffers;
    } else {
      return null;
    }
  };

}
