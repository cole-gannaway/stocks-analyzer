export interface ITransaction {
    date: number;
    symbol: string;
    amount: number;
    price: number;
}

export function isBuy(transaction:ITransaction){
    if (transaction.amount > 0) return true;
    else return false;
}

export function deepCopy(transaction: ITransaction){
    const newObj:ITransaction = {
        date: transaction.date,
    symbol: transaction.symbol,
    amount: transaction.amount,
    price: transaction.price,
    }
    return newObj;
}