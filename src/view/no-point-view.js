import { FilterTypes } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const NoPointsTextType = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.FUTURE]: 'There are no future points now',
};

const createNoPointTemplate = (filterType) => {
  const noPointTextValue = NoPointsTextType[filterType];
  return (
    `<p class="trip-events__msg">${noPointTextValue}</p>`
  );
};

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
