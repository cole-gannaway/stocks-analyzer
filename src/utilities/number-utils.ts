export function formatWithCommas(formatter: Intl.NumberFormat, val: number) {
  formatter.format(val);
}

export function roundDecimalPlaces(val: number, decimalPlaces: number) {
  return (
    Math.round((val + Number.EPSILON) * Math.pow(10, decimalPlaces)) /
    Math.pow(10, decimalPlaces)
  );
}
