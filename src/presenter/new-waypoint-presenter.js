import {render, RenderPosition, remove} from '../framework/render.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import {UserAction, UpdateType} from '../const.js';


export default class WayPointNewPresenter {

  #pointListContainer = null;
  #changeData = null;
  #destroyCallback = null;
  #pointEditComponent = null;
  #wayPointsModel = null;



  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;

  }

  init = (callback, wayPointsModel) => {

    this.#destroyCallback = callback;

    if (this.#pointEditComponent !== null) {
      return;
    }

    const allOffers = wayPointsModel.offersByType;
    const destinations = wayPointsModel.destinations;

    this.#pointEditComponent = new EditEventFormView(destinations, allOffers);

    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  setSaving = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };



  #handleFormSubmit = (wayPoint) => {

    this.#changeData(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      wayPoint,
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  }

  }


