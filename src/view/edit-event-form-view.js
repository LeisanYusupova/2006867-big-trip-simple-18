
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { destinations } from '../mock/destinations.js';
import { humanizeFullDate } from '../util.js';


const editEventViewTemplate = (wayPoint) => {
  const {basePrice, type, dateFrom, dateTo, destinationInfo, availableOffers, selectedOffers, offers} = wayPoint;
  console.log(wayPoint.offers);
  const destinationPictures = destinationInfo.pictures;
  const destinationName = destinationInfo.name;
  const fullDateFrom = humanizeFullDate(dateFrom);
  const fullDateTo = humanizeFullDate(dateTo);



  const destinationPhotosTemplate = destinationPictures.map((item) =>
    `<img class="event__photo" src=${item.src} alt="Event photo">`
  ).join('');


  const offerTemplate = availableOffers.offers.map((item) => {
    const checked = selectedOffers.some((offerId) => offerId.id === item.id) ? 'checked' : '';
    return (`<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.id}" type="checkbox" name="event-offer-${item.id}" data-offer-id="${item.id}" ${checked}/>
            <label class="event__offer-label" for="event-offer-${item.id}">
            <span class="event__offer-title">${item.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${item.price}</span>
            </label>
          </div>`
    );
  }).join('');


  return (

    `
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">hoose event tCype</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>

                <div class="event__type-item">
                    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                    <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
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
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${offerTemplate}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationInfo.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${destinationPhotosTemplate}
                      </div>
                    </div>
                  </section>
                </section>
      </form>`
  );
};

export default class EditEventFormView extends AbstractStatefulView{


  constructor(wayPoint, destinations, allOffers, offersByType) {
    super();
    this._state = EditEventFormView.parsePointToState(wayPoint, destinations, allOffers, offersByType);
    this.#setInnerHandlers();
  }

  get template() {
    return editEventViewTemplate(this._state);
  }

  reset = (waypoint) => {
    this.updateElement(
      EditEventFormView.parseStateToPoint(waypoint)
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
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
    this.updateElement({
      destination: currentDestination.id
    });
  };

  #priceToggleHandler = (evt) => {
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
    selectedOffers.forEach((selectedOffer) => selectedOfferIds.push(Number(selectedOffer.dataset.offerId)));
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




  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
  };


  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditEventFormView.parseStateToPoint(this._state));
  };

  #setInnerHandlers = () => {
    this.element.querySelector('#event-price-1').addEventListener('input', this.#priceToggleHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersToggleHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#eventTypeToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
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
