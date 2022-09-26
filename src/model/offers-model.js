import Observable from "../framework/observable";

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
    }
  };

  get offersByType() {
    return this.#offers;
  }


  getCurrentOffersByType = (point) => {
    console.log(this.#offersByType);
    const currentOffersByType = this.#offersByType.find((offer) => offer.type === point.type);
    console.log(currentOffersByType);
    return currentOffersByType;
  };

  getSelectedOffers = (point) => {
    const currentOffersByType = this.getCurrentOffersByType(point);
    console.log(currentOffersByType);
    if (currentOffersByType) {
      const selectedOffers = currentOffersByType.offers.filter((offer) => point.offers.includes(offer.id));
      return selectedOffers;
    } else {
      return null;
    }
  };

}
