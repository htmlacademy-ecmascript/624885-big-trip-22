import EditFormView from '../view/edit-form-view.js';
import { UpdateType, UserAction } from '../constants';
import { RenderPosition, remove, render } from '../framework/render';

export default class NewTripEventPresenter {
  #tripEventListContainer = null;
  #onDataChange = null;
  #onDestroy = null;
  #destinationModel = null;
  #offerModel = null;

  #tripEventEditComponent = null;

  constructor({
    tripEventListContainer,
    onDataChange,
    onDestroy,
    destinationModel,
    offerModel
  }) {
    this.#tripEventListContainer = tripEventListContainer;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  init() {
    if(this.#tripEventEditComponent !== null) {
      return;
    }
    this.#tripEventEditComponent = new EditFormView({
      offersList: this.#offerModel.offers,
      destinationsList: this.#destinationModel.destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleCancelClick,
      isNewTripEvent: true
    });

    render(this.#tripEventEditComponent,
      this.#tripEventListContainer,
      RenderPosition.AFTERBEGIN
    );

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if(this.#tripEventEditComponent === null) {
      return;
    }
    this.#onDestroy();
    remove(this.#tripEventEditComponent);
    this.#tripEventEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (tripEvent) => {
    this.#onDataChange(
      UserAction.CREATE_EVENT,
      UpdateType.MINOR,
      tripEvent
    );
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };
}
