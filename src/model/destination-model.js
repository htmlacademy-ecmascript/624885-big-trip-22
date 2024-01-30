export default class DestinationModel {
  #destinations = [];
  #tripEventApiService = null;
  constructor({tripEventApiService}) {
    this.#tripEventApiService = tripEventApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#tripEventApiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }
  }

  getById(id) {
    return (
      this.#destinations.find((destination) => destination.id === id) || null
    );
  }
}
