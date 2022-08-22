import EventsListView from '../view/trip-events-list-view.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import WayPointView from '../view/way-point-view.js';
import { destinations } from '../mock/destinations.js';
import { offersByType } from '../mock/offers.js';
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
    const destinationEditForm = destinations.find(
      (item) => item.id === this.wayPoints[0].destination
    );
    this.wayPoints[0].destinations = destinationEditForm;
    const allOffersForType = offersByType.find((item) => item.type === this.wayPoints[0].type);
    this.wayPoints[0].allOffers = allOffersForType;
    console.log(this.wayPoints[0].allOffers);
    const checkedOffers = this.offers.filter((item) =>
      this.wayPoints[0].offers.some((offerId) => offerId.id === item.id));
    console.log(checkedOffers);
    this.wayPoints[0].checkedOffers = checkedOffers;
    render(new EditEventFormView(this.wayPoints[0]), this.eventsListComponent.getElement());

    for (let i = 1; i < this.wayPoints.length; i++) {
      const destinationName = destinations.find(
        (item) => item.id === this.wayPoints[i].destination
      ).name;

      this.wayPoints[i].destinationName = destinationName;

      const selectedOffers = this.offers.filter((item) =>
        this.wayPoints[i].offers.some((offerId) => offerId.id === item.id)
      );

      this.wayPoints[i].selectedOffers = selectedOffers;
      render(new WayPointView(this.wayPoints[i]), this.eventsListComponent.getElement());
    }
  };
}
