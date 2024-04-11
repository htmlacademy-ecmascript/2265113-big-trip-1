import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { DATE_FORMAT_FULL } from '../utils/point.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createEditPointTemplate(point, pointTypes, destinations) {
  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
${pointTypes.map((pointType) => (
    `<div class="event__type-item">
      <input id="event-type-${pointType}-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === point.type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${point.id}">${pointType}</label>
  </div>`
  )).join('')}
        </fieldset>
      </div>
    </div>
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${point.id}">
      ${point.type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${point.destinationEntity.name || ''}" list="destination-list-${point.id}">
      <datalist id="destination-list-${point.id}">
        ${destinations.map((dest) =>`<option value="${dest.name}"></option>`).join('')}
      </datalist>
    </div>
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
      <input class="event__input  event__input--time start__date" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${dayjs(point.date_from).format(DATE_FORMAT_FULL)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
      <input class="event__input  event__input--time end__date" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${dayjs(point.date_to).format(DATE_FORMAT_FULL)}">
    </div>
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${point.id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${point.base_price}">
    </div>
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">${point.id ? 'Delete' : 'Cancel'}</button>
    ${point.id ? (
    `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
  ) : ''}
  </header>
  <section class="event__details">
    ${point.allOffers[point.type].length ?
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${point.allOffers[point.type].map((offer) => (
    `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-${point.id}" type="checkbox" name="event-offer-${offer.title}"
${point.offers.includes(offer.id) ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${offer.title}-${point.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`
  )).join('')}
      </div>
    </section>`
    : ''}

    ${point.destination ? (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${point.destinationEntity.description}</p>

      ${point.destinationEntity.pictures.length > 0 ? (
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${point.destinationEntity.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
      </div>
    </div>`
    ) : ''}

    </section>`
  ) : ''}

  </section>
</form>`;
}

export default class EditPointView extends AbstractStatefulView {
  #pointTypes = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleViewClick = null;
  #startDatepicker = null;
  #endDatepicker = null;

  constructor({point, pointTypes, destinations, onFormSubmit, onViewClick}) {
    super();
    this._setState(point);
    this.#pointTypes = pointTypes;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleViewClick = onViewClick;

    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }

    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }
  }

  get template() {
    return createEditPointTemplate(this._state, this.#pointTypes, this.#destinations);
  }

  #startTimeChangeHandler = ([userDate]) => {
    this.updateElement({
      date_from: userDate,
    });
  };

  #endTimeChangeHandler = ([userDate]) => {
    this.updateElement({
      date_to: userDate,
    });
  };

  #setStartDatepicker() {
    if (this._state.date_from) {
      this.#startDatepicker = flatpickr(this.element.querySelector('.start__date'),
        {
          enableTime: true,
          dateFormat: 'd/m/Y H:i',
          defaultDate: this._state.date_from,
          onChange: this.#startTimeChangeHandler,
        },
      );
    }
  }

  #setEndDatepicker() {
    if (this._state.date_to) {
      this.#endDatepicker = flatpickr(this.element.querySelector('.end__date'),
        {
          enableTime: true,
          dateFormat: 'd/m/Y H:i',
          defaultDate: this._state.date_to,
          onChange: this.#endTimeChangeHandler,
        },
      );
    }
  }

  #handleCloseButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleViewClick();
  };

  #handleSaveButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this._state);
  };

  #typeToggleHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const destination = this.#destinations.find((dest) => dest.name === evt.target.value);
    if (!destination) {
      return;
    }

    this.updateElement({
      destination: destination.id,
      destinationEntity: destination,
    });
  };

  _restoreHandlers = () => {
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#handleSaveButtonClick);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleCloseButtonClick);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);

    this.#setStartDatepicker();
    this.#setEndDatepicker();
  };
}
