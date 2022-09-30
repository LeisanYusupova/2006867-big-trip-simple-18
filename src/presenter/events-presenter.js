import EventsListView from '../view/trip-events-list-view.js';
import PointPresenter from './point-presenter.js';
import NoPointView from '../view/no-point-view.js';
import SortingView from '../view/sorting-view.js';
import LoadingView from '../view/loading-view.js';
import WayPointNewPresenter from './new-waypoint-presenter.js';
import { filter } from '../util.js';
import { sortByDate } from '../util.js';
import { sortByPrice } from '../util.js';
import {FilterTypes, SortType, UpdateType, UserAction} from '../const.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class EventsPresenter {
  #eventsContainer = null;
  #wayPointsModel = null;
  #filterModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #eventsListComponent = new EventsListView();
  #loadingComponent = new LoadingView();


  #sortComponent = null;
  #noPointsComponent = null;
  #pointPresenter = new Map();
  #wayPointNewPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterTypes.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);


  constructor(eventsContainer, wayPointsModel, offersModel, destinationsModel, filterModel ) {
    this.#eventsContainer = eventsContainer;
    this.#wayPointsModel = wayPointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#wayPointNewPresenter = new WayPointNewPresenter(this.#eventsListComponent.element, this.#handleViewAction);


    this.#wayPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);


  }

  get wayPoints() {
    this.filterType = this.#filterModel.filter;
    const wayPoints = this.#wayPointsModel.wayPoints;
    const filteredWayPoints = filter[this.#filterType](wayPoints);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredWayPoints.sort(sortByDate);
      case SortType.PRICE:
        return filteredWayPoints.sort(sortByPrice);
    }
    return this.#wayPointsModel.wayPoints;
  }


  init = () => {
    this.#renderBoard();
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          this.#wayPointsModel.updateWayPoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_TASK:
        this.#wayPointNewPresenter.setSaving();
        try {
          this.#wayPointsModel.addWayPoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_TASK:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          this.#wayPointsModel.deleteWayPoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.#offersModel, this.#destinationsModel);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard({resetSortType: true});
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };


  #renderSort = () => {
    this.#sortComponent = new SortingView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#eventsListComponent.element, RenderPosition.AFTERBEGIN);
  };

  createWayPoint = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterTypes.EVERYTHING);
    this.#wayPointNewPresenter.init(callback, this.#destinationsModel, this.#offersModel);
  };

  #handleModeChange = () => {
    this.#wayPointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };


  #renderPoint = (wayPoint) => {

    const pointPresenter = new PointPresenter(this.#eventsListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(wayPoint, this.#offersModel, this.#destinationsModel);
    this.#pointPresenter.set(wayPoint.id, pointPresenter);
  };

  #renderNoPoints = () => {
    this.#noPointsComponent = new NoPointView(this.#filterType);
    render(this.#noPointsComponent, this.#eventsListComponent.element);
  };


  #clearBoard = ({resetSortType = false} = {}) => {

    this.#wayPointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#noPointsComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };


  #renderPoints = (wayPoints) => {
    wayPoints.forEach((tripPoint) => this.#renderPoint(tripPoint));
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#eventsListComponent.element, RenderPosition.AFTERBEGIN);
  };


  #renderBoard = () => {
    const wayPoints = this.wayPoints;
    const wayPointsCount = wayPoints.length;

    render(this.#eventsListComponent, this.#eventsContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (wayPointsCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints(wayPoints);
  };
}
