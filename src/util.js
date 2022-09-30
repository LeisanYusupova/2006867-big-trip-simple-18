import dayjs from 'dayjs';
import {FilterTypes} from './const.js';


const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

const isPointFuture = (dueDate) => dayjs(dueDate).isAfter(dayjs(), 'D') || dayjs(dueDate).isSame(dayjs(), 'D');

const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('D MMMM');

const humanizePointTime = (date) => dayjs(date).format('HH:mm');

const humanizeFullDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};


const sortByDate = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;


const filter = {
  [FilterTypes.EVERYTHING]: (points) => points,
  [FilterTypes.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom))
};


export {isDatesEqual, humanizeTaskDueDate, humanizePointTime, humanizeFullDate, sortByDate, sortByPrice, filter, isPointFuture};
