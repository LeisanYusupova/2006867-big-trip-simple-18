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

const FilterType = {
  ALL: 'everything',
  FUTURE: 'future',
};

const ActionType = {
  EDIT: 'edit',
  CREATE: 'create',
};



export {SortType, UserAction, UpdateType, FilterType, ActionType};
