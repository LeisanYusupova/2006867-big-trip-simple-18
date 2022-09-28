import AbstractView from '../framework/view/abstract-view.js';
import { humanizeTaskDueDate, humanizePointTime} from '../util.js';


const createWayPointTemplate = (wayPoint, destination, offers) => {
  const {basePrice, type, dateFrom, dateTo} = wayPoint;
  const {name} = destination;


  const timeFrom = dateFrom !== null
    ? humanizePointTime(dateFrom)
    : '';
  const timeTo = dateTo !== null
    ? humanizePointTime(dateTo)
    : '';

  const dayFrom = humanizeTaskDueDate(dateFrom);

  const createTemplateOffers = (offers) => {
    if (!offers?.length) {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">No offers</span>
        </li>`
      );
    }
    const selectedOffers = offers.map((offer) => `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`).join('');
    return selectedOffers;
  };

  return (

  `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${dayFrom}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${name}</h3>
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
    ${createTemplateOffers(offers)}
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`
  );
};

export default class WayPointView extends AbstractView{

  #wayPoint = null;
  #destination = null;
  #offers = null;

  constructor(wayPoint, destination, offers) {
    super();
    this.#wayPoint = wayPoint;
    this.#destination= destination;
    this.#offers = offers;
  }

  get template() {
    return createWayPointTemplate(this.#wayPoint, this.#destination, this.#offers);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
