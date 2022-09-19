import dayjs from 'dayjs';

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



export {getRandomInteger, humanizeTaskDueDate, humanizePointTime, humanizeFullDate, sortByDate, sortByPrice};
