import { createElement } from '../render.js';
import { humanizeTaskDueDate, humanizePointTime} from '../util.js';


const createWayPointTemplate = (wayPoint) => {
  const {basePrice, type, dateFrom, dateTo, destinations, selectedOffers} = wayPoint;

  const pointDestinations = wayPoint.destinations;

  const timeFrom = dateFrom !== null
    ? humanizePointTime(dateFrom)
    : '';
  const timeTo = dateTo !== null
    ? humanizePointTime(dateTo)
    : '';
  const dayFrom = humanizeTaskDueDate(dateFrom);

  const offersTemplate = selectedOffers.map((offer) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`
  ).join('');

  return (

  `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${dayFrom}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${pointDestinations.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${timeFrom}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${timeTo}</time>
      </p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${offersTemplate}
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`
  );
};

export default class WayPointView{
  #element = null;
  #wayPoint = null;
  #offer = null;

  constructor(wayPoint, offer) {
    this.#wayPoint = wayPoint;
    this.#offer = offer;
  }

  get template() {
    return createWayPointTemplate(this.#wayPoint, this.#offer);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
