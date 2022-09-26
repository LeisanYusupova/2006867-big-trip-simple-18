import NewEventButtonView from './view/new-event-button-view.js';
import { render } from './framework/render.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import WayPointsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';




const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');

const filterModel = new FilterModel();
const wayPointsModel = new WayPointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

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


filterPresenter.init();
eventsPresenter.init();
