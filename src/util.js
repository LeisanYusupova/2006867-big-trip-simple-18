import dayjs from 'dayjs';
import {FilterType} from './const.js';

const isPointFuture= (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


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
  const weight = getWeightForNullDate(pointA.dueDate, pointB.dueDate);

  return weight ?? dayjs(pointB.dueDate).diff(dayjs(pointA.dueDate));
};

const sortByPrice = (pointA, pointB) => {
  return pointB.basePrice - pointA.basePrice;
};

const filter = {
  [FilterType.ALL]: (points) =>points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom))
};



export {getRandomInteger, isDatesEqual, humanizeTaskDueDate, humanizePointTime, humanizeFullDate, sortByDate, sortByPrice, filter};
