import dayjs from 'dayjs';
import { FilterType } from '../const';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.date_from).isAfter(dayjs())),
  [FilterType.PRESENT]: (points) => points.filter((point) => dayjs(point.date_from).isBefore(dayjs()) && dayjs(point.date_to).isAfter(dayjs())),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs(point.date_to).isBefore(dayjs())),
};
