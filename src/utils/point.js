import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const DATE_FORMAT = 'MMM D';
export const TIME_FORMAT = 'HH:mm';
export const DATE_FORMAT_FULL = 'DD/MM/YY hh:mm';

const padStart = (number) => String(number).padStart(2, '0');

export const formatDuration = (duration) => {
  const days = Math.floor(duration / (60 * 24));
  const hours = Math.floor((duration % (60 * 24)) / 60);
  const minutes = Math.floor((duration % (60 * 24)) % 60);

  if (days > 0) {
    return `${padStart(days)}d ${padStart(hours)}h ${padStart(minutes)}m`;
  }
  if (hours > 0) {
    return `${padStart(hours)}h ${padStart(minutes)}m`;
  }
  return `${padStart(minutes)}m`;
};

export function sortByDurationTime(pointA, pointB) {
  return pointB.duration - pointA.duration;
}

export function sortByPrice(pointA, pointB) {
  return pointB.price - pointA.price;
}

export function sortByStartDate(pointA, pointB) {
  return dayjs(pointA.dateFrom) - dayjs(pointB.dateFrom);
}

export function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB);
}
