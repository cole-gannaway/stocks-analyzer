export const MILLIS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;

export function getMonthInMMFormat(month: number) {
  const actualMonth = month + 1;
  return month + 1 < 10
    ? `0${actualMonth.toString()}`
    : actualMonth.toString();
}
export function getDateinDDFormat(date: number) {
  return date < 10
    ? `0${date.toString()}`
    : date.toString();
}
export function compareDates(a: Date, b: Date) {
  let compare = a.getFullYear() - b.getFullYear();
  return compare === 0
    ? a.getMonth() - b.getMonth()
    : compare;
}
