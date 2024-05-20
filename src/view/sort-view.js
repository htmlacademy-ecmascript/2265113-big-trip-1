import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createNewSortTemplate(currentSortType) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" ${currentSortType === SortType.DEFAULT ? 'checked' : ''} value="sort-day">
    <label class="trip-sort__btn ${currentSortType === SortType.DEFAULT ? 'trip-sort__btn--active' : ''}" for="sort-day" data-sort-type="${SortType.DEFAULT}">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" ${currentSortType === SortType.TIME ? 'checked' : ''} value="sort-time">
    <label class="trip-sort__btn ${currentSortType === SortType.TIME ? 'trip-sort__btn--active' : ''}" for="sort-time" data-sort-type="${SortType.TIME}">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" ${currentSortType === SortType.PRICE ? 'checked' : ''} value="sort-price">
    <label class="trip-sort__btn ${currentSortType === SortType.PRICE ? 'trip-sort__btn--active' : ''}" for="sort-price" data-sort-type="${SortType.PRICE}">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`;
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  #currentSortType = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createNewSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.dataset.sortType) {
      this.#handleSortTypeChange(evt.target.dataset.sortType);
    }
  };
}
