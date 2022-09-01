import EventsListView from '../view/trip-events-list-view.js';
import PointPresenter from './point-presenter.js';
import NoPointView from '../view/no-point-view.js';
import SortingView from '../view/sorting-view.js';
import { destinations } from '../mock/destinations.js';
import { offersByType } from '../mock/offers.js';
import {render, RenderPosition} from '../framework/render.js';


export default class EventsPresenter {
  #eventsContainer = null;
  #wayPointsModel = null;
  #eventsListComponent = new EventsListView();
  #sortComponent = new SortingView();
  #noPointsComponent = new NoPointView();
  #wayPoints = [];
  #offers = [];

  constructor(eventsContainer, wayPointsModel) {
    this.#eventsContainer = eventsContainer;
    this.#wayPointsModel = wayPointsModel;
  }

  init = () => {
    this.#wayPoints = [...this.#wayPointsModel.wayPoints];
    this.#offers = [...this.#wayPointsModel.offers];

    this.#renderBoard();
  };


  #renderSort = () => {
    render(this.#sortComponent, this.#eventsListComponent.element, RenderPosition.AFTERBEGIN);
  };


  #renderPoint = (wayPoint) => {
    const pointPresenter = new PointPresenter(this.#eventsListComponent.element);

    pointPresenter.init(wayPoint);
  }

  #renderNoPoints = () => {
    render(this.#noPointsComponent, this.#eventsListComponent.element);
  };

  #renderPointsList = () => {
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

  #renderBoard = () => {
    render(this.#eventsListComponent, this.#eventsContainer);

    if (this.#wayPoints.length === 0) {
      this.#renderNoPoints;
      return
    }

    this.#renderPointsList();
    this.#renderSort();
  }
}
