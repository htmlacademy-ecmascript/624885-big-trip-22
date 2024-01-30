export default class OfferModel {
  #offers = [];
  #tripEventApiService = null;
  constructor({tripEventApiService}) {
    this.#tripEventApiService = tripEventApiService;
  }

  async init() {
    try {
      this.#offers = await this.#tripEventApiService.offers;
    } catch (err) {
      this.#offers = [];
    }
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
