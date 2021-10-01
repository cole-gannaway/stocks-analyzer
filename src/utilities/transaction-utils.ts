import {
  IDollarCostAverageProfitSummary,
  IDollarCostAverageSummary,
  IDollarCostAverageTransactions,
} from '../model/IDollarCostAverage';
import { deepCopy, isBuy, ITransaction } from '../model/ITransaction';
import { ObjectIDWrapper } from '../model/ObjectIDWrapper';

function appendToMap(
  map: Map<string, ObjectIDWrapper<ITransaction>[]>,
  key: string,
  value: ObjectIDWrapper<ITransaction>
) {
  let val = map.get(key);
  if (!val) {
    val = [];
  }
  // shallow copy
  val.push({ id: value.id, value: deepCopy(value.value) });
  map.set(key, val);
}
export function convertTransactionsToDollarCostAverageData(transactionsData: {
  [id: string]: ITransaction;
}) {
  // convert to a list
  const transactions: ObjectIDWrapper<ITransaction>[] = [];
  Object.entries(transactionsData).forEach((entry) =>
    transactions.push({ id: entry[0], value: entry[1] })
  );

  const symbolToTransactionsMap = new Map<
    string,
    ObjectIDWrapper<ITransaction>[]
  >();
  transactions.forEach((transaction) => {
    appendToMap(symbolToTransactionsMap, transaction.value.symbol, transaction);
  });

  const dcaTransactions: IDollarCostAverageTransactions = {};
  symbolToTransactionsMap.forEach((values, symbol) => {
    const buys: ObjectIDWrapper<ITransaction>[] = [];
    const sells: ObjectIDWrapper<ITransaction>[] = [];
    // separate by buys and sells
    values.forEach((transaction) => {
      if (isBuy(transaction.value)) buys.push(transaction);
      else sells.push(transaction);
    });
    buys.sort((a, b) => a.value.date - b.value.date);
    // sort each by date reverse to use pop
    sells.sort((a, b) => b.value.date - a.value.date);
    buys.forEach((buy) => {
      // append to results
      dcaTransactions[buy.id] = { result: { ...buy.value }, sells: {} };
      const currentDca = dcaTransactions[buy.id];

      // apply as many sells as possible to each buy
      while (sells.length !== 0 && buy.value.amount !== 0) {
        const sell = sells.pop();
        if (sell) {
          let amountSold: number = 0;
          // apply all of the sell to buy
          if (buy.value.amount >= -1 * sell.value.amount) {
            amountSold = sell.value.amount;
            sell.value.amount = 0;
            buy.value.amount += amountSold;
          }
          // apply partial sell to buy
          else {
            amountSold = -1 * buy.value.amount;
            sell.value.amount += buy.value.amount;
            buy.value.amount = 0;
            // push the sell back on to use for other buys
            sells.push(sell);
          }
          // copy sell and overwrite the amount applied
          currentDca.sells[sell.id] = { ...sell.value };
          currentDca.sells[sell.id].amount = amountSold;
          // overwrite the current result
          currentDca.result.amount += amountSold;
        }
      }
    });
  });
  return dcaTransactions;
}

function addToSumMap(map: Map<string, number>, symbol: string, amount: number) {
  let sum = map.get(symbol);
  if (!sum) sum = 0;
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
