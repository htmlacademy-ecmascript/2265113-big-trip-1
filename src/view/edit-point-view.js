import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';
import { DATE_FORMAT_FULL } from '../utils.js';

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
      <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${dayjs(point.date_from).format(DATE_FORMAT_FULL)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${dayjs(point.date_to).format(DATE_FORMAT_FULL)}">
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
    ${point.offers.length ?
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${point.offersEntity.map((offer) => (
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

export default class EditPointView extends AbstractView {
  #point = null;
  #pointTypes = null;
  #destinations = null;
  #handleFormSubmit = null;

  constructor({point, pointTypes, destinations, onFormSubmit}) {
    super();
    this.#point = point;
    this.#pointTypes = pointTypes;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;

    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
  }

  get template() {
    return createEditPointTemplate(this.#point, this.#pointTypes, this.#destinations);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
}
