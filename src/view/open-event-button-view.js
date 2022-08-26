import AbstractView from '../framework/view/abstract-view.js';

const createOpenEventButtonTemplate = () => (
  `<button class="event__rollup-btn" type="button">
  <span class="visually-hidden">Open event</span>
  </button>`
);

export default class OpenEventButtonView extends AbstractView {

  get template() {
    return createOpenEventButtonTemplate();
  }
}
