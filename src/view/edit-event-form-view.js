
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeFullDate } from '../util.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {offersTypes} from '../mock/const.js';

const BLANK_POINT = {
  basePrice: null,
  destination: null,
  type: null,
  dateFrom: null,
  dateTo: null,
  offers: null
};

const editEventViewTemplate = (wayPoint) => {
  const {basePrice, dateFrom, dateTo, destination, type, offers, offersByType, destinations} = wayPoint;

  const tripDestination = destinations.find((pointDestination) => (pointDestination.id === destination));
  const fullDateFrom = humanizeFullDate(dateFrom);
  const fullDateTo = humanizeFullDate(dateTo);


  const createTripTransportTypeList = (wayPoint) => {
    const eventTypeListTemplate = offersTypes.map((type) =>
      `
      <div class='event__type-item'>
        <input id='event-type-${type}-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='${type}'
        ${wayPoint.type === type ? 'checked' : ''}>
        <label class='event__type-label  event__type-label--${type.toLowerCase()}' for='event-type-${type}-1'>
          ${type}
        </label>
      </div>
    `
    );

    return eventTypeListTemplate.join('');
  };


  const createDestinationTemplate = (tripDestination, allDestinations, type) => {

    const destinationsOptions = allDestinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
    return (
      `<label class="event__label  event__type-output" for="event-destination-1">
         ${type}
       </label>
       <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${tripDestination.name}" list="destination-list-1" required>
       <datalist id="destination-list-1">
         ${destinationsOptions}
       </datalist>`);
  };

  const createPhotosTemplate = (pictures) => {
    const photosContainer = pictures.map((picture) => `
    <img class="event__photo" src="${picture.src}" alt="${picture.description}">
    `).join('');
    return (
      `<div class="event__photos-container">
        <div class="event__photos-tape">
        ${photosContainer}
        </div>
      </div>`
    );
  };

  const createDestinationSectionTemplate = (tripDestination) => (`
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${tripDestination.description}</p>
    ${tripDestination.pictures ? createPhotosTemplate(tripDestination.pictures) : ''}
  </section>
  `);


  const createOffersTemplate = (currentOffers, offersByType) => {

    const availableOffers = offersByType.offers.map((offer) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.toLowerCase()}-1" data-offer-id="${offer.id}" type="checkbox"
        name="event-offer-${offer.title.toLowerCase()}" ${currentOffers.includes(offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.title.toLowerCase()}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `).join('');
    return (`
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${availableOffers}
        </div>
      </section>
    `);
  };


  return (

    `
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>

               ${createTripTransportTypeList(wayPoint)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            ${createDestinationTemplate(tripDestination, destinations, type)}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${fullDateFrom}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${fullDateTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice ? basePrice : ''}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${createOffersTemplate(offers, offersByType)}
          ${createDestinationSectionTemplate(tripDestination)}
      </section>
    </form>`
  );
};

export default class EditEventFormView extends AbstractStatefulView{

  #datepicker = null;



  constructor(wayPoint = BLANK_POINT, destinations, allOffers, offersByType) {
    super();
    this._state = EditEventFormView.parsePointToState(wayPoint, destinations, allOffers, offersByType);
    this.#setInnerHandlers();
  }

  get template() {
    return editEventViewTemplate(this._state);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  reset = (waypoint) => {
    this.updateElement(
      EditEventFormView.parseStateToPoint(waypoint)
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  #eventTypeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
      offersByType: this._state.allOffers.find((offers) => offers.type === evt.target.value)
    });
  };



  #destinationToggleHandler = (evt) => {
    console.log(destinations);
    const currentDestination = destinations.find((destination) => destination.name === evt.target.value);
    console.log(currentDestination);
    this.updateElement({
      destination: currentDestination.id
    });
  };

  #priceToggleHandler = (evt) => {
    console.log(evt.target.value);
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: [userDate],
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: [userDate],
    });
  };

  #offersToggleHandler = () => {
    const selectedOffers = this.element.querySelectorAll('.event__offer-checkbox:checked');
    const selectedOfferIds = [];
    selectedOffers.forEach((selectedOffer) => selectedOfferIds.push({id: Number(selectedOffer.dataset.offerId)}));
    console.log(selectedOfferIds);
    this._setState({
      offers: selectedOfferIds,
    });
  };

  setTypeChangeHandler = (callback) => {
    this._callback.typeChange = callback;
    this.element.querySelectorAll('.event__type-input').forEach((item) => {
      item.addEventListener('input', this.#typeChangeHandler)
    })
  }

  #typeChangeHandler = (evt) => {
    this._callback.typeChange(evt.currentTarget.value);
  }



  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditEventFormView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    console.log('delete');
    this._callback.deleteClick(EditEventFormView.parseStateToPoint(this._state));
  }

  #setInnerHandlers = () => {
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
    this.element.querySelector('#event-price-1').addEventListener('input', this.#priceToggleHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersToggleHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#eventTypeToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
  }

  #setDatepickerFrom = () => {
    this.#datepicker = flatpickr (
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler
      }
    );
  };

  #setDatepickerTo = () => {
    this.#datepicker = flatpickr (
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler
      }
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
  };

  setDeleteClickHandler =(callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }


  static parsePointToState = (wayPoint, destinations, allOffers, offersByType) => ({...wayPoint,
    destinations: destinations,
    allOffers: allOffers,
    offersByType: offersByType
  });

  static parseStateToPoint = (state) => {

    const wayPoint = {...state};

    delete wayPoint.destinations;
    delete wayPoint.offersByType;
    delete wayPoint.allOffers;
    return wayPoint;

  }

}
