import {render, replace, remove} from '../framework/render.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import WayPointView from '../view/way-point-view.js'
import {UserAction, UpdateType} from '../const.js';
import { isDatesEqual } from '../util.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};



export default class PointPresenter {

  #pointListContainer = null;
  #changeData = null;
  #changeMode = null;


  #pointComponent = null;
  #pointEditComponent = null;


  #wayPoint = null;
  #allOffers = null;
  #selectedOffers = null;
  #currentOffersByType = null;
  #currentDestination = null;
  #destinations = null;
  #mode = Mode.DEFAULT;


  constructor(pointListContainer, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (wayPoint, offersModel, destinationsModel) => {
    this.#wayPoint = wayPoint;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#allOffers = offersModel.offersByType;
    console.log(this.#allOffers);
    this.#selectedOffers = offersModel.getSelectedOffers(this.#wayPoint);
    console.log(this.#selectedOffers);
    this.#currentOffersByType = offersModel.getCurrentOffersByType(this.#wayPoint);

    this.#currentDestination = destinationsModel.getCurrentDestination(this.#wayPoint);
    this.#destinations = destinationsModel.destinations;
    console.log(this.#destinations);

    this.#pointComponent = new WayPointView(this.#wayPoint, this.#currentDestination, this.#selectedOffers);
    this.#pointEditComponent = new EditEventFormView(this.#destinations, this.#allOffers, this.#wayPoint, this.#currentOffersByType);


    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setCloseFormHandler(this.#handleCloseForm);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick)


    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };


  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };


  #handleFormSubmit = (update) => {

    const isMinorUpdate =
      !isDatesEqual(this.#wayPoint.dateFrom, update.dateFrom) ||
      !isDatesEqual(this.#wayPoint.dateTo, update.dateTo) ||
      this.#wayPoint.basePrice !== update.basePrice;

    this.#changeData(
      UserAction.UPDATE_TASK,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
  };

  #handleCloseForm = () => {
    this.#pointEditComponent.reset(this.#wayPoint);
    this.#replaceFormToPoint();
  };

  #handleDeleteClick = (wayPoint) => {
    this.#changeData(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      wayPoint,
    );
  }
  }


