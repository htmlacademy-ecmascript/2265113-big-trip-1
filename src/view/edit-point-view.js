import dayjs from 'dayjs';
import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { DATE_FORMAT_FULL } from '../utils/point.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { AlertMessage } from '../const.js';

const ALERT_SHOW_TIME = 5000;

function createEditPointTemplate(point, allOffers, destinationEntity, pointTypes, destinations) {
  const isDeleting = point.isDeleting ? 'Deleting...' : 'Delete';

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
      <input id="event-type-${pointType}-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === point.type ? 'checked' : ''} ${point.isDisabled ? 'disabled' : ''}>
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
      <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${destinationEntity ? he.encode(destinationEntity.name) : he.encode('')}" list="destination-list-${point.id}" ${point.isDisabled ? 'disabled' : ''}>
      <datalist id="destination-list-${point.id}">
        ${destinations.map((dest) =>`<option value="${dest.name}"></option>`).join('')}
      </datalist>
    </div>
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
      <input class="event__input  event__input--time start__date" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${dayjs(point.dateFrom).format(DATE_FORMAT_FULL)}" ${point.isDisabled ? 'disabled' : ''}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
      <input class="event__input  event__input--time end__date" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${dayjs(point.dateTo).format(DATE_FORMAT_FULL)}" ${point.isDisabled ? 'disabled' : ''}>
    </div>
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${point.id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${point.id}" type="number" name="event-price" value="${point.price}" ${point.isDisabled ? 'disabled' : ''}>
    </div>
    <button class="event__save-btn  btn  btn--blue" type="submit">${point.isSaving ? 'Saving...' : 'Save'}</button>
    <button class="event__reset-btn" type="reset">${point.id ? isDeleting : 'Cancel'}</button>
    ${point.id ? (
    `<button class="event__rollup-btn" type="button" ${point.isDisabled ? 'disabled' : ''}>
        <span class="visually-hidden">Open event</span>
      </button>`
  ) : ''}
  </header>
  <section class="event__details">
    ${allOffers[point.type].length ?
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${allOffers[point.type].map((offer) => (
    `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-${point.id}" data-offer-id="${offer.id}" type="checkbox" name="event-offer-${offer.title}"
${point.offers.includes(offer.id) ? 'checked' : ''} ${point.isDisabled ? 'disabled' : ''}>
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
      <p class="event__destination-description">${destinationEntity.description}</p>

      ${destinationEntity.pictures.length > 0 ? (
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${destinationEntity.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
      </div>
    </div>`
    ) : ''}

    </section>`
  ) : ''}

  </section>
</form>`;
}

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleViewClick = null;
  #handleDeleteClick = null;

  #allOffers = null;
  #pointTypes = null;
  #destinations = null;
  #destinationEntity = null;

  #startDatepicker = null;
  #endDatepicker = null;

  constructor({point, allOffers, destinationEntity, pointTypes, destinations, onFormSubmit, onViewClick, onDeleteClick}) {
    super();
    this._setState(point);
    this.#allOffers = allOffers;
    this.#destinationEntity = destinationEntity;
    this.#pointTypes = pointTypes;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleViewClick = onViewClick;
    this.#handleDeleteClick = onDeleteClick;

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
    return createEditPointTemplate(this._state, this.#allOffers, this.#destinationEntity, this.#pointTypes, this.#destinations);
  }

  #startTimeChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #endTimeChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setStartDatepicker() {
    if (this._state.dateFrom) {
      this.#startDatepicker = flatpickr(this.element.querySelector('.start__date'),
        {
          enableTime: true,
          dateFormat: 'd/m/Y H:i',
          defaultDate: this._state.dateFrom,
          onChange: this.#startTimeChangeHandler,
          'time_24hr': true,
          locale: {
            firstDayOfWeek: 1
          }
        },
      );
    }
  }

  #setEndDatepicker() {
    if (this._state.dateTo) {
      this.#endDatepicker = flatpickr(this.element.querySelector('.end__date'),
        {
          enableTime: true,
          dateFormat: 'd/m/Y H:i',
          defaultDate: this._state.dateTo,
          onChange: this.#endTimeChangeHandler,
          'time_24hr': true,
          locale: {
            firstDayOfWeek: 1
          }
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
    if (this._state.dateTo <= this._state.dateFrom) {
      this.#showAlert(AlertMessage.DATE);
      return;
    }

    if (this._state.price < 1) {
      this.#showAlert(AlertMessage.PRICE);
      return;
    }

    if (!this._state.destination) {
      this.#showAlert(AlertMessage.DESTINATION);
      return;
    }

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

    this.#destinationEntity = this.#destinations.find((dest) => dest.id === destination.id);
    this.updateElement({
      destination: destination.id
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const newPrice = parseInt(evt.target.value, 10);
    if (!newPrice || newPrice < 0) {
      return;
    }
    this.updateElement({
      price: newPrice
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedOffers = [...this._state.offers];
    const offerId = evt.target.dataset.offerId;

    if (evt.target.checked) {
      selectedOffers.push(offerId);
    } else {
      selectedOffers.splice(selectedOffers.indexOf(offerId), 1);
    }

    this.updateElement({
      offers: selectedOffers
    });
  };

  _restoreHandlers = () => {
    this.element.querySelector('.event__available-offers')?.addEventListener('change',this.#offerChangeHandler);

    this.element.querySelector('.event__save-btn').addEventListener('click', this.#handleSaveButtonClick);
    if (this._state.id) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleCloseButtonClick);
    }
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);

    this.#setStartDatepicker();
    this.#setEndDatepicker();
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(this._state);
  };

  #showAlert = (message) => {
    const alertContainer = document.createElement('div');
    alertContainer.classList.add('error__alert');
    alertContainer.textContent = message;

    document.body.append(alertContainer);

    setTimeout(() => {
      alertContainer.remove();
    }, ALERT_SHOW_TIME);
  };
}
