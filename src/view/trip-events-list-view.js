import { createElement } from '../render.js';

const createEventsListTemplate = () => '<section class="trip-events"></section>';

export default class EventsListView{
  getTemplate() {
    return createEventsListTemplate();
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
