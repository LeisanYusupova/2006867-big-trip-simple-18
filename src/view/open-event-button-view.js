import { createElement } from '../render.js';

const createOpenEventButtonTemplate = () => (
  `<button class="event__rollup-btn" type="button">
  <span class="visually-hidden">Open event</span>
  </button>`
);

export default class OpenEventButtonView {
  getTemplate() {
    return createOpenEventButtonTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
