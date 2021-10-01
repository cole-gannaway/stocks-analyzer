export const MILLIS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;

export function getMonthInMMFormat(month: number) {
  const actualMonth = month + 1;
  if (actualMonth < 10) {
    return '0' + actualMonth.toString();
  } else {
    return actualMonth.toString();
  }
}
export function getDateinDDFormat(date: number) {
  if (date < 10) {
    return '0' + date.toString();
  } else {
    return date.toString();
  }
}
export function compareDates(a: Date, b: Date) {
  let compare = a.getFullYear() - b.getFullYear();
  if (compare === 0) {
    compare = a.getMonth() - b.getMonth();
  }
  if (compare === 0) {
    compare = a.getDate() - b.getDate();
  }
  return compare;
}
