import { ITransaction } from "./ITransaction";

export interface IDollarCostAverage {
    symbol: string;
    price: number;
}

export interface IDollarCostAverageTransactions {
    [buyId: string]: {
      sells: {
        [sellId:string]:ITransaction
      }
      result: ITransaction;
    }
  }

  export interface IDollarCostAverageSummary{
    [symbol: string]: IDollarCostAverage
  }

  export interface IDollarCostAverageProfitSummary {
    profits: {
      [symbol:string] : number;
    }
    notSoldAmount: {
      [symbol:string] : number;
    }
  }