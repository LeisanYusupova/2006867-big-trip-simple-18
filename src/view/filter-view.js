import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilterType, isDisabled) => {
  const {type, name} = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${type === currentFilterType ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};
const createFilterTemplate = (filterItems, currentFilterType, isDisabled) => {
  const filterItemsTemplate = filterItems
  .map((filter) => createFilterItemTemplate(filter, currentFilterType, isDisabled))
  .join('');

    return (
    `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  )
};

export default class FilterView extends AbstractView{

  #filters = null;
  #currentFilterType = null;
  #isDisabled = null;

  constructor(filters, currentFilterType, isDisabled) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#isDisabled = isDisabled;
  }


  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType, this.#isDisabled);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.classList.contains('trip-filters__filter-input')){
      this._callback.filterTypeChange(evt.target.value);
    }
  }
}
