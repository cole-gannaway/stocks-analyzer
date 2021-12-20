export function formatWithCommas(formatter: Intl.NumberFormat, val: number) {
  formatter.format(val);
}

export function roundDecimalPlaces(val: number, decimalPlaces: number) {
  return (
    Math.round((val + Number.EPSILON) * Math.pow(10, decimalPlaces)) /
    Math.pow(10, decimalPlaces)
  );
}

/**
 * Formats dollars into strings
 * @param val 
 */
export function formatDollarAmount (val: number) : string{
  if (val === 0) {
    return "-"
  }
  // round to nearest significant figures for really small decimals
  else if (val > -1 && val < 1){
    return "$" + truncateSignificantFigures(val,4);
  }
  else {
    return "$" + val.toFixed(2);
  }
}

/**
 * For numbers between -1 and 1, truncating to nearest significant figures makes the most sense
 * 
 * @param val 
 * @param sigFigs 
 * @returns 
 */
function truncateSignificantFigures(val: number, sigFigs: number){
  const str = val.toString();
  let newStr = "";
  let sigFigCount = 0;
  for (let char of str){
    if (sigFigCount < sigFigs){
      if (char === "." || (sigFigCount === 0 && char === "0")){
        newStr = newStr.concat(char);
      }
      else {
        newStr = newStr.concat(char);
        sigFigCount++;
      }
    }
  }
  return newStr;
}
