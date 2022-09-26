import Observable from "../framework/observable";

export default class OffersModel extends Observable {

  #offersApiService = null;
  #offers = [];
  #offersByType = null;



  constructor(offersApiService) {
    super();
    this.#offersApiService = offersApiService;
  }


  get offersByType() {
    return this.#offers;
  }

  init = async () => {
    try {
      const offers = await this.#offersApiService.offers;
      this.#offersByType = offers;
      console.log(this.#offersByType);
      return  this.#offersByType;
    } catch(err) {
      this.#offers = [];
    }
  };


  getCurrentOffersByType = (point) => {
    const currentOffersByType = this.#offersByType.find((offer) => offer.type === point.type);
    console.log(currentOffersByType);
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
