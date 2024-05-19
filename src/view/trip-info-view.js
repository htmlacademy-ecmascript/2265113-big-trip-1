import AbstractView from '../framework/view/abstract-view';

function createTripInfoTemplate({ title, duration, cost }) {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>

        <p class="trip-info__dates">${duration}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #title = null;
  #duration = null;
  #cost = null;

  constructor(title = '', duration = '', cost = '') {
    super();
    this.#title = title;
    this.#duration = duration;
    this.#cost = cost;
  }

  get template() {
    return createTripInfoTemplate({
      title: this.#title,
      duration: this.#duration,
      cost: this.#cost
    });
  }
}
