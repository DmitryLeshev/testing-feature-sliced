import declOfNum from './declOfNum';
import { transformDate, DD_MM_YYYY, hh_mm_DD_MM_YYYY } from './transformDate';

export default function whenWasOnline(timestamp: number) {
  const HOUR = 3600;
  const MINUTS = 60;

  const date = new Date();
  const time = Math.floor(new Date().getTime() / 1000);
  const today = date.setHours(0, 0, 0, 0) / 1000;
  const yesterday = date.setDate(date.getDate() - 1) / 1000;
  const secondsLastLogin = Math.floor(time) - timestamp;

  if (secondsLastLogin < 0)
    return `[timestamp = ${timestamp}] [date = ${transformDate(
      timestamp,
      hh_mm_DD_MM_YYYY,
    )}] Привет из будущего`;

  if (secondsLastLogin < HOUR) {
    const count = Math.floor(secondsLastLogin / MINUTS);
    return `Был ${count} ${declOfNum(count, ['минуту', 'минуты', 'минут'])} назад`;
  }

  if (secondsLastLogin < today) {
    const count = Math.floor(secondsLastLogin / HOUR);
    return `Был ${count} ${declOfNum(count, ['час', 'часа', 'часов'])} назад`;
  }

  if (secondsLastLogin < yesterday) return 'Был вчера ';

  return transformDate(timestamp, DD_MM_YYYY);
}
