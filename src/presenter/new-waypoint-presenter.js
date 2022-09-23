import {render, RenderPosition, remove} from '../framework/render.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import {UserAction, UpdateType} from '../const.js';


export default class WayPointNewPresenter {

  #pointListContainer = null;
  #changeData = null;
  #dataModel = null;
  #destroyCallback = null;

  #pointEditComponent = null;


  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = (callback, dataModel) => {

    this.#destroyCallback = callback;

    if (this.#pointEditComponent !== null) {
      return;
    }

    const allOffers = dataModel.allOffers;
    const destinations = dataModel.destinations;
    const offersByType = dataModel.offersByType;


    this.#pointEditComponent = new EditEventFormView(destinations, allOffers, offersByType);

    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    // this.#pointEditComponent.setTypeChangeHandler(this.#handleTypeChange);
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


  // #handleTypeChange = (newType) => {
  //   this.#wayPoint = {...this.#wayPoint, type: newType};
  //   this.init(this.#wayPoint);
  // }

  #handleFormSubmit = (update) => {

    this.#changeData(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      {id: 6, ...update},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  }

  }


