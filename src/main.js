import NewEventButtonView from './view/new-event-button-view.js';

import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import WayPointsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';


import PointsApiService from './points-api-service.js';

import { render } from './framework/render.js';


const AUTHORIZATION = 'Basic qwerty1';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');

const filterModel = new FilterModel();

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
const wayPointsModel = new WayPointsModel(pointsApiService);
const offersModel = new OffersModel(pointsApiService);
const destinationsModel = new DestinationsModel(pointsApiService);

const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, wayPointsModel);
const newEventButtonComponent = new NewEventButtonView();
const eventsPresenter = new EventsPresenter(siteContentElement, wayPointsModel, offersModel, destinationsModel, filterModel);

const handleNewEventFormClose = () => {
  newEventButtonComponent.element.disabled = false;
};

const handleNewEventButtonClick = () => {
  eventsPresenter.createWayPoint(handleNewEventFormClose);
  newEventButtonComponent.element.disabled = true;
};





filterPresenter.init();
eventsPresenter.init();

Promise.all([offersModel.init(), destinationsModel.init()])
  .then(() => wayPointsModel.init())
  .finally(() => {
    render(newEventButtonComponent, siteMainElement);
    newEventButtonComponent.setClickHandler(handleNewEventButtonClick, offersModel, destinationsModel );
  })
