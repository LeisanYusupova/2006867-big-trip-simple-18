import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const createRandomIdFromRangeGenerator = (min, max, numberOfElements) => {
  const randomArray= [];
  while (randomArray.length < numberOfElements) {
    const randomId = getRandomInteger(min,max);
    if (!randomArray.includes(randomId)) {
      randomArray.push(randomId);
    }
  }
  return randomArray;
}

const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('D MMMM');

export {getRandomInteger, humanizeTaskDueDate, createRandomIdFromRangeGenerator};
