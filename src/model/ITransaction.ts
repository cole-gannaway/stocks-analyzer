export interface ITransaction {
  date: number;
  symbol: string;
  amount: number;
  price: number;
}

export function isBuy(transaction: ITransaction) {
  return transaction.amount > 0;
}

/** Extends the ITransaction interface to add an id field */
export interface ITransactionAndId extends ITransaction {
  id: string;
}
