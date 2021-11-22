import {
  IDollarCostAverageProfitSummary,
  IDollarCostAverageSummary,
  IDollarCostAverageTransactions,
} from '../model/IDollarCostAverage';
import { ITransaction } from '../model/ITransaction';

export function addToSumMap(map: Map<string, number>, symbol: string, amount: number) {
  let sum = map.get(symbol) ?? 0;
  sum += amount;
  map.set(symbol, sum);
}

export function summarizeDollarCostAverageTransactions(
  dcaTransactions: IDollarCostAverageTransactions
) {
  // sum up the amount left per symbol
  const symbolToAmountsSumMap: Map<string, number> = new Map<string, number>();
  // sum up the (amount * price) left per symbol for a weighted sum
  const symbolToWeightedSumMap: Map<string, number> = new Map<string, number>();
  Object.keys(dcaTransactions).forEach((buyId) => {
    const buy = dcaTransactions[buyId];
    if (buy.result.amount !== 0) {
      const symbol = buy.result.symbol;
      addToSumMap(symbolToAmountsSumMap, symbol, buy.result.amount);
      addToSumMap(
        symbolToWeightedSumMap,
        symbol,
        buy.result.amount * buy.result.price
      );
    }
  });

  const dcaSummary: IDollarCostAverageSummary = {};
  symbolToAmountsSumMap.forEach((amountSum, symbol) => {
    const weightedSum = symbolToWeightedSumMap.get(symbol);
    if (weightedSum) {
      const dcaPrice = weightedSum / amountSum;
      dcaSummary[symbol] = {
        symbol: symbol,
        price: dcaPrice,
      };
    }
  });
  return dcaSummary;
}

export function summarizeProfitsFromDollarCostAverageTransactions(
  dcaTransactions: IDollarCostAverageTransactions,
  transactionsData: { [id: string]: ITransaction }
) {
  const symbolToSpendingsSumMap: Map<string, number> = new Map<
    string,
    number
  >();
  const symbolToEarningsSumMap: Map<string, number> = new Map<string, number>();
  const symbolToAmountNotSoldMap: Map<string, number> = new Map<
    string,
    number
  >();
  Object.keys(dcaTransactions).forEach((buyId) => {
    const buy = dcaTransactions[buyId];
    const symbol = buy.result.symbol;
    const sellIds = Object.keys(buy.sells);

    const amountNotSold = buy.result.amount;
    const amountSold = transactionsData[buyId].amount - amountNotSold;

    // sum up how much was bought but not sold
    if (amountNotSold !== 0) {
      addToSumMap(symbolToAmountNotSoldMap, symbol, amountNotSold);
    }
    // sum up how much was bought and sold
    addToSumMap(
      symbolToSpendingsSumMap,
      symbol,
      amountSold * transactionsData[buyId].price
    );
    sellIds.forEach((sellId) => {
      const sell = buy.sells[sellId];
      // sum up returns
      const returns = -1 * sell.amount * sell.price;
      // add to earnings
      addToSumMap(symbolToEarningsSumMap, symbol, returns);
    });
  });

  // combine
  const symbolToProfitsSumMap: Map<string, number> = new Map<string, number>();
  symbolToSpendingsSumMap.forEach((val, key) =>
    addToSumMap(symbolToProfitsSumMap, key, -1 * val)
  );
  symbolToEarningsSumMap.forEach((val, key) =>
    addToSumMap(symbolToProfitsSumMap, key, val)
  );

  // return
  const profitSummary: IDollarCostAverageProfitSummary = {
    profits: {},
    notSoldAmount: {},
  };
  symbolToProfitsSumMap.forEach(
    (val, key) => (profitSummary.profits[key] = val)
  );
  symbolToAmountNotSoldMap.forEach(
    (val, key) => (profitSummary.notSoldAmount[key] = val)
  );
  return profitSummary;
}
