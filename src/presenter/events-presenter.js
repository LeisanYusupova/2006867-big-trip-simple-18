import EventsListView from '../view/trip-events-list-view.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import WayPointView from '../view/way-point-view.js';
import { destinations } from '../mock/destinations.js';
import { render } from '../render.js';


export default class EventsPresenter {
  eventsListComponent = new EventsListView();
  editEventFormComponent = new EditEventFormView();

  init = (eventsContainer, wayPointsModel) => {
    this.eventsContainer = eventsContainer;
    this.wayPointsModel = wayPointsModel;
    this.wayPoints = [...this.wayPointsModel.getWayPoints()];
    this.offers = [...this.wayPointsModel.getOffers()];
    console.log(this.wayPoints);
    console.log(this.offers);
    render(this.eventsListComponent, this.eventsContainer);
    render(this.editEventFormComponent, this.eventsListComponent.getElement());

    for (let i = 0; i < this.wayPoints.length; i++) {
      const destinationName = destinations.find(
        (item) => item.id ===this.wayPoints[i].destination
      ).name;
      this.wayPoints[i].destinationName = destinationName;

      const selectedOffers = this.offers.filter((item) =>
      this.wayPoints[i].offers.some((offerId) => offerId === item.id)
      );

      console.log(selectedOffers);
      this.wayPoints[i].seletedOffers = selectedOffers;
        render(new WayPointView(this.wayPoints[i]), this.eventsListComponent.getElement());
    }
  };
}
