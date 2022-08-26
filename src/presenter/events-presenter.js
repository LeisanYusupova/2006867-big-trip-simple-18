import EventsListView from '../view/trip-events-list-view.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import WayPointView from '../view/way-point-view.js';
import NoPointView from '../view/no-point-view.js';
import { destinations } from '../mock/destinations.js';
import { offersByType } from '../mock/offers.js';
import { render } from '../framework/render.js';


export default class EventsPresenter {
  #eventsContainer = null;
  #wayPointsModel = null;
  #eventsListComponent = new EventsListView();
  #wayPoints = [];
  #offers = [];


  #renderPoint = (wayPoint) => {
    const pointComponent = new WayPointView(wayPoint);
    const pointEditComponent = new EditEventFormView(wayPoint);

    const replacePointToForm = () => {
      this.#eventsListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    }

    const replaceFormToPoint = () => {
      this.#eventsListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    }

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    })


    pointEditComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    })

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', replaceFormToPoint);


    render(pointComponent, this.#eventsListComponent.element);
  }

  init = (eventsContainer, wayPointsModel) => {
    this.#eventsContainer = eventsContainer;
    this.#wayPointsModel = wayPointsModel;
    this.#wayPoints = [...this.#wayPointsModel.wayPoints];
    this.#offers = [...this.#wayPointsModel.offers];

    render(this.#eventsListComponent, this.#eventsContainer);



    if (this.#wayPoints.length === 0) {
      render(new NoPointView(), this.#eventsListComponent.element)
    } else {
      for (let i = 0; i < this.#wayPoints.length; i++) {

        const pointDestinations = destinations.find(
          (item) => item.id === this.#wayPoints[i].destination
        );
        this.#wayPoints[i].destinations = pointDestinations;


        const selectedOffers = this.#offers.filter((item) =>
          this.#wayPoints[i].offers.some((offerId) => offerId.id === item.id)
        );
        this.#wayPoints[i].selectedOffers = selectedOffers;


        const allOffersForType = offersByType.find(
          (item) => item.type === this.#wayPoints[i].type);
        this.#wayPoints[i].allOffers = allOffersForType;


        this.#renderPoint(this.#wayPoints[i]);
      }
    }
  };
}
