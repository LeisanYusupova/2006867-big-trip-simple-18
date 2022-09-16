import EventsListView from '../view/trip-events-list-view.js';
import PointPresenter from './point-presenter.js';
import NoPointView from '../view/no-point-view.js';
import SortingView from '../view/sorting-view.js';
import { updateItem } from '../util.js';
import { sortByDate } from '../util.js';
import { sortByPrice } from '../util.js';
import { SortType } from '../const.js';
import {render, RenderPosition} from '../framework/render.js';


export default class EventsPresenter {
  #eventsContainer = null;
  #wayPointsModel = null;
  #eventsListComponent = new EventsListView();
  #sortComponent = new SortingView();
  #noPointsComponent = new NoPointView();
  #wayPoints = [];
  #allOffers = [];
  #destinations = [];
  #offersByType = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.PRICE;
  #sourcedWayPoints = [];

  constructor(eventsContainer, wayPointsModel) {
    this.#eventsContainer = eventsContainer;
    this.#wayPointsModel = wayPointsModel;
  }

  init = () => {
    this.#wayPoints = [...this.#wayPointsModel.wayPoints];
    console.log(this.#wayPoints);
    this.#allOffers = [...this.#wayPointsModel.allOffers];
    this.#sourcedWayPoints = [...this.#wayPointsModel.wayPoints];
    this.#destinations = [...this.#wayPointsModel.destinations];
    this.#offersByType = [...this.#wayPointsModel.offersByType];

    this.#renderBoard();
  };

  #handlePointChange = (updatedPoint) => {
    this.#wayPoints = updateItem(this.#wayPoints, updatedPoint);
    this.#sourcedWayPoints = updateItem(this.#sourcedWayPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        console.log('date');
        this.#wayPoints.sort(sortByDate);
        break;
      case SortType.PRICE:
        console.log('price');
        this.#wayPoints.sort(sortByPrice);
        console.log(this.#wayPoints);
        break;
      default:
        this.#wayPoints = [...this.#sourcedWayPoints];
    }
    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointsList();
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
  };


  #renderSort = () => {
    render(this.#sortComponent, this.#eventsListComponent.element, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };


  #renderPoint = (wayPoint) => {
    const pointPresenter = new PointPresenter(this.#eventsListComponent.element, this.#handlePointChange, this.#handleModeChange);

    pointPresenter.init(wayPoint);

    this.#pointPresenter.set(wayPoint.id, pointPresenter);
  }

  #renderNoPoints = () => {
    render(this.#noPointsComponent, this.#eventsListComponent.element);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPointsList = () => {
      for (let i = 0; i < this.#wayPoints.length; i++) {

        const pointDestinations = this.#destinations.find(
          (item) => item.id === this.#wayPoints[i].destination
        );
        this.#wayPoints[i].destinationInfo = pointDestinations;
        console.log(this.#wayPoints[i].destinationInfo);



        const selectedOffers = this.#allOffers.filter((item) =>
          this.#wayPoints[i].offers.some((offerId) => offerId.id === item.id)
        );
        this.#wayPoints[i].selectedOffers = selectedOffers;


        const allOffersForType = this.#offersByType.find(
          (item) => item.type === this.#wayPoints[i].type);
        this.#wayPoints[i].availableOffers = allOffersForType;



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
