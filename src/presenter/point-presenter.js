import {render, replace, remove} from '../framework/render.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import WayPointView from '../view/way-point-view.js';


export default class PointPresenter {

  #pointListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #wayPoint = null;

  constructor(pointListContainer) {
    this.#pointListContainer = pointListContainer;
  }

  init = (wayPoint) => {
    this.#wayPoint = wayPoint;

    this.#pointComponent = new WayPointView(wayPoint);
    this.#pointEditComponent = new EditEventFormView(wayPoint);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    render(this.#pointComponent, this.#pointListContainer);

  }

    #replacePointToForm = () => {
      replace(this.#pointEditComponent, this.#pointComponent);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    }

    #replaceFormToPoint = () => {
      replace(this.#pointComponent, this.#pointEditComponent);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
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

    #handleFormSubmit = () => {
      this.#replaceFormToPoint();
    };

  }


