import NewEventButtonView from './view/new-event-button-view.js';
import { render } from './framework/render.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import WayPointsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import DataModel from './model/data-model.js';




const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');

const filterModel = new FilterModel();
const wayPointsModel = new WayPointsModel();
const dataModel = new DataModel();

console.log(dataModel.allOffers)

const filterPresenter = new FilterPresenter(siteFilterElement, wayPointsModel, filterModel);
const newEventButtonComponent = new NewEventButtonView();
const eventsPresenter = new EventsPresenter(siteContentElement, wayPointsModel, filterModel);

const handleNewEventFormClose = () => {
  newEventButtonComponent.element.disabled = false;
};

const handleNewEventButtonClick = () => {
  eventsPresenter.createWayPoint(handleNewEventFormClose);
  newEventButtonComponent.element.disabled = true;
};

render(newEventButtonComponent, siteMainElement);
newEventButtonComponent.setClickHandler(handleNewEventButtonClick, dataModel );


filterPresenter.init();
eventsPresenter.init();
