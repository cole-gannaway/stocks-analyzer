export function formatWithCommas(formatter: Intl.NumberFormat, val: number) {
  return formatter.format(val);
}

export function roundDecimalPlaces(val: number, decimalPlaces: number) {
  return (
    Math.round((val + Number.EPSILON) * Math.pow(10, decimalPlaces)) /
    Math.pow(10, decimalPlaces)
  );
}

export function toFixedUnlessZero(val: number, fractionDigits: number) {
  const toFixed = val.toFixed(fractionDigits);
  if (toFixed !== '0.00') return toFixed;
  else return val.toString();
}
