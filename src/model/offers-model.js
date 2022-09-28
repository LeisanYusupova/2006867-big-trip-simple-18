import Observable from '../framework/observable';
import { UpdateType,  } from '../const.js';

export default class OffersModel extends Observable {

  #offersApiService = null;
  #offersByType = null;
  #offers = [];




  constructor(offersApiService) {
    super();
    this.#offersApiService = offersApiService;
  }


  init = async () => {
    try {
      const offers = await this.#offersApiService.offers;
      this.#offersByType = offers;
      console.log(this.#offersByType);
      return  this.#offersByType;
    } catch(err) {
      this.#offers = [];
    } finally {
      this._notify(UpdateType.INIT);
    }
  };

  get offersByType() {
    return this.#offers;
  }


  getCurrentOffersByType = (point) => {
    const currentOffersByType = this.#offersByType.find((offer) => offer.type === point.type);
    return currentOffersByType;
  };

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
