import { offersByType } from "../mock/offers";


export default class OffersModel {
  #offersByType = offersByType;

  get offersByType() {
    return this.#offersByType;
  }

  getCurrentOffersByType = (point) => {
    let currentOffersByType = [];
    currentOffersByType = this.#offersByType.find((offer) => offer.type === point.type);
    return currentOffersByType;
  };

  getSelectedOffers = (point) => {
    const currentOffersByType = this.getCurrentOffersByType(point);
    const selectedOffers = currentOffersByType.offers.filter((item) =>point.offers.some((offerId) => offerId.id === item.id));
    return selectedOffers;
  };
}
