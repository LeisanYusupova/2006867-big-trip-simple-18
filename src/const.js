const tripTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const SortType = {
  DAY: 'day',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

const ActionType = {
  EDIT: 'edit',
  CREATE: 'create',
};

export {SortType, UserAction, UpdateType, FilterTypes, ActionType, tripTypes};
