import NewEventButtonView from './view/new-event-button-view.js';
import FilterView from './view/filter-view.js';
import SortingView from './view/sorting-view.js';
import { render } from './framework/render.js';
import EventsPresenter from './presenter/events-presenter.js';
import WayPointsModel from './model/events-model.js';

const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter();
const wayPointsModel = new WayPointsModel();


render(new FilterView(), siteFilterElement);
render(new NewEventButtonView(), siteMainElement);
render(new SortingView(), siteContentElement);
eventsPresenter.init(siteContentElement, wayPointsModel);
