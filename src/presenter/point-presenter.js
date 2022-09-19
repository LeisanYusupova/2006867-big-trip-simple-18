import {render, replace, remove} from '../framework/render.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import WayPointView from '../view/way-point-view.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

function getPointDestination(currentPoint, destinations) {
  return destinations.find((item) => item.id === currentPoint.destination);
}

function getPointOffers(currentPoint, allOffers) {
  let selectedOffers = [];
  selectedOffers = allOffers.filter((item) =>currentPoint.offers.some((offerId) => offerId.id === item.id));
  return selectedOffers
}

function getAvailableOffers(currentPoint, offersByType) {
  let availableOffers = [];
  availableOffers = offersByType.find((item) => item.type ===currentPoint.type);
  return availableOffers;
}

export default class PointPresenter {

  #pointListContainer = null;
  #changeData = null;
  #changeMode = null;

  #wayPointsModel = null;
  #destinations = null;
  #allOffers = null;
  #offersByType = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #wayPoint = null;
  #mode = Mode.DEFAULT;


  constructor(pointListContainer, changeData, changeMode, wayPointsModel) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#wayPointsModel = wayPointsModel;
    this.#allOffers = [...this.#wayPointsModel.allOffers];
    this.#destinations = [...this.#wayPointsModel.destinations];
    this.#offersByType = [...this.#wayPointsModel.offersByType];
  }

  init = (wayPoint) => {
    this.#wayPoint = wayPoint;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    const destinationInfo = getPointDestination(wayPoint, this.#destinations);
    const selectedOffers = getPointOffers(wayPoint, this.#allOffers);
    const availableOffers = getAvailableOffers(wayPoint, this.#offersByType);


    wayPoint.destinationInfo = destinationInfo;
    wayPoint.selectedOffers = selectedOffers;
    wayPoint.availableOffers = availableOffers;

    this.#pointComponent = new WayPointView(wayPoint, destinationInfo, selectedOffers, availableOffers);
    this.#pointEditComponent = new EditEventFormView(wayPoint, this.#destinations, this.#allOffers, this.#offersByType);


    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setTypeChangeHandler(this.#handleTypeChange);


    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
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

  #handleTypeChange = (newType) => {
    this.#wayPoint = {...this.#wayPoint, type: newType};
    this.init(this.#wayPoint);
  }

  #handleFormSubmit = (wayPoint) => {
    this.#changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      wayPoint,
    );
    this.#replaceFormToPoint();
  };

  }


