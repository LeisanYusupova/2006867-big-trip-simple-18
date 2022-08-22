import { createElement } from '../render.js';

const createOpenEventButtonTemplate = () => (
  `<button class="event__rollup-btn" type="button">
  <span class="visually-hidden">Open event</span>
  </button>`
);

export default class OpenEventButtonView {
  #element = null;

  get template() {
    return createOpenEventButtonTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
