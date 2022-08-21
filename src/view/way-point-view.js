import { createElement } from '../render.js';
import { humanizeTaskDueDate } from '../util.js';


const createWayPointTemplate = (wayPoint) => {
  const {base_price, type, date_from, date_to, destinationName, selectedOffers} = wayPoint;
  // const {title, price} = selectedOffers;
  const dateFrom = date_from!== null
    ? humanizeTaskDueDate(date_from)
    : '';
  const dateTo = date_to!== null
    ? humanizeTaskDueDate(date_to)
    : '';

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
      <time class="event__date" datetime="2019-03-18">MAR 18</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destinationName}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${dateFrom}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${dateTo}</time>
      </p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${base_price}</span>
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
  )
}

export default class WayPointView{
  constructor(wayPoint, offer) {
    this.wayPoint = wayPoint;
    this.offer = offer;
  }

  getTemplate() {
    return createWayPointTemplate(this.wayPoint, this.offer);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
