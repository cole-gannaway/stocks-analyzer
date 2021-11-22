export const MILLIS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;

export function getMonthInMMFormat(month: number) {
  const actualMonth = month + 1;
  return actualMonth < 10 ? `0${actualMonth}` : `${actualMonth}`;
}
export function getDateinDDFormat(date: number) {
  return date < 10 ? `0${date}` : `${date}`;
}
export function compareDates(a: Date, b: Date) {
  let compare = a.getFullYear() - b.getFullYear();
  if (compare === 0) {
    compare = a.getDate() - b.getDate();
  }
  return compare;
}
