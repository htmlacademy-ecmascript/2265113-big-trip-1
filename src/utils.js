import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'hh:mm';
const DATE_FORMAT_FULL = 'DD/MM/YY hh:mm';


export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export const formatDate = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';

export const formatDateFull = (dueDate) => dueDate ? dayjs.utc(dueDate).format(DATE_FORMAT_FULL) : '';

export const formatTime = (dueTime) => dueTime ? dayjs.utc(dueTime).format(TIME_FORMAT) : '';

export const differenceTime = (toTime, fromTime) => {
  const diffMin = dayjs.utc(toTime).diff(fromTime, 'minute');
  const diffHour = dayjs.utc(toTime).diff(fromTime, 'hour');
  const diffResult = diffMin - diffHour * 60;
  return diffMin < 60 ? `${diffMin + 1}m` : `${diffHour}h ${diffResult + 1}m`;
};

