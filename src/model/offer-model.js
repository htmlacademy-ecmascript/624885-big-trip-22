import { getOffers } from '../mock/offers.js';

export default class OfferModel {
  #offers = [];
  constructor() {
    this.#offers = getOffers();
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return (
      this.#offers.find((offer) => offer.type === type) || null
    );
  }
}
