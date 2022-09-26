import NewEventButtonView from './view/new-event-button-view.js';

import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import WayPointsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';


import PointsApiService from './points-api-service.js';
import OffersApiService from './offers-api-service.js';
import DestinationsApiService from './destinations-api-service.js';

import { render } from './framework/render.js';


const AUTHORIZATION = 'Basic qwerty';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');

const filterModel = new FilterModel();
const wayPointsModel = new WayPointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));

const filterPresenter = new FilterPresenter(siteFilterElement, wayPointsModel, filterModel);
const newEventButtonComponent = new NewEventButtonView();
const eventsPresenter = new EventsPresenter(siteContentElement, wayPointsModel, offersModel, destinationsModel, filterModel);

const handleNewEventFormClose = () => {
  newEventButtonComponent.element.disabled = false;
};

const handleNewEventButtonClick = () => {
  eventsPresenter.createWayPoint(handleNewEventFormClose);
  newEventButtonComponent.element.disabled = true;
};

render(newEventButtonComponent, siteMainElement);
newEventButtonComponent.setClickHandler(handleNewEventButtonClick, offersModel, destinationsModel );


// filterPresenter.init();
eventsPresenter.init();
wayPointsModel.init();
destinationsModel.init();
offersModel.init();
