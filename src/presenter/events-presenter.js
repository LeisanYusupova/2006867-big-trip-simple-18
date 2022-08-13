import EventsListView from '../view/trip-events-list-view.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import WayPointView from '../view/way-point-view.js';
import { render } from '../render.js';

export default class EventsPresenter {
  eventsListComponent = new EventsListView();

  init = (eventsContainer) => {
    this.eventsContainer = eventsContainer;

    render(this.eventsListComponent, this.eventsContainer);
    render(new EditEventFormView(), this.eventsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WayPointView(), this.eventsListComponent.getElement());
    }
  };
}
