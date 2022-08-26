import AbstractView from '../framework/view/abstract-view.js';

const createNoPointTemplate = () => (
  `<p class="trip-events__msg">Click New Event to create your first point</p>`
);

export default class NoPointView extends AbstractView {

  get template() {
    return createNoPointTemplate();
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
