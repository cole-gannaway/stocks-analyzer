import { ITransaction } from '../model/ITransaction';

export function createCSV(rows: string[][]) {
  let csvContent =
    'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
  return csvContent;
}

export function convertTransactionRowIntoCSVRows(dataRows: ITransaction[]) {
  const csvRows = dataRows.map(({ symbol, date, amount, price }) => {
    const row = [symbol, date.toString(), amount.toString(), price.toString()];
    return row;
  });
  const headerRow = ['symbol', 'date', 'amount', 'price'];
  csvRows.unshift(headerRow);
  return csvRows;
}

export function convertCSVRowIntoTransactionRow(csvRow: string[]) {
  const symbol = csvRow[0];
  const date: number = parseInt(csvRow[1]);
  const amount: number = parseFloat(csvRow[2]);
  const price:number = parseFloat(csvRow[3]);
  const result: ITransaction = {
    symbol: symbol,
    date: !isNaN(date) ? date : -1,
    amount: !isNaN(amount) ? amount : -1,
    price: !isNaN(price) ? price : -1,
  };
  return result;
}
