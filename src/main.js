import NewEventButtonView from './view/new-event-button-view.js';
import { render } from './framework/render.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import WayPointsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';


const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');

const filterModel = new FilterModel();
const wayPointsModel = new WayPointsModel();

// const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, WayPointsModel);
const eventsPresenter = new EventsPresenter(siteContentElement, wayPointsModel);


render(new NewEventButtonView(), siteMainElement);
// filterPresenter.init();
eventsPresenter.init();
