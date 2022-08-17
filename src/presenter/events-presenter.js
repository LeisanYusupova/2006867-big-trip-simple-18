import EventsListView from '../view/trip-events-list-view.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import WayPointView from '../view/way-point-view.js';
import { render } from '../render.js';


export default class EventsPresenter {
  eventsListComponent = new EventsListView();
  editEventFormComponent = new EditEventFormView();

  init = (eventsContainer, wayPointsModel) => {
    this.eventsContainer = eventsContainer;
    this.wayPointsModel = wayPointsModel;
    this.wayPoints = [...this.wayPointsModel.getWayPoints()];
    console.log(this.wayPoints);
    render(this.eventsListComponent, this.eventsContainer);
    render(this.editEventFormComponent, this.eventsListComponent.getElement());

     for (let i = 0; i < this.wayPoints.length; i++) {
      render(new WayPointView(this.wayPoints[i]), this.eventsListComponent.getElement());
    }
  };
}
