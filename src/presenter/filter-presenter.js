import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { FilterTypes, UpdateType } from '../const.js';


export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #wayPointsModel = null;
  #filterIsDisabled;

  #filterComponent = null;

  constructor(filterContainer, filterModel, wayPointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#wayPointsModel = wayPointsModel;

    this.#wayPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return [
      {
        type: FilterTypes.EVERYTHING,
        name: 'Everything'
      },
      {
        type: FilterTypes.FUTURE,
        name: 'Future'
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    this.#filterIsDisabled = !(this.#wayPointsModel.availabilityFuturePoints);
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FilterView(filters, this.#filterModel.filter, this.#filterIsDisabled);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };


  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
