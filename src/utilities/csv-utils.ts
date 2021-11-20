import { ITransaction } from '../model/ITransaction';

export function createCSV(rows: string[][]) {
  let csvContent =
    'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
  return csvContent;
}

export function convertTransactionRowIntoCSVRows(dataRows: ITransaction[]) {
  const csvRows = dataRows.map(({symbol, date, amount, price}) => {
    return [
      symbol, date.toString(), amount.toString(), price.toString()
    ];
  });
  const headerRow = ['symbol', 'date', 'amount', 'price'];
  csvRows.unshift(headerRow);
  return csvRows;
}

export function convertCSVRowIntoTransactionRow(csvRow: string[]) {
  const symbol = csvRow[0];
  const date = parseInt(csvRow[1]);
  const amount = parseFloat(csvRow[2]);
  const price = parseFloat(csvRow[3]);
  const result: ITransaction = {
    symbol,
    date: !isNaN(date) ? date : -1,
    amount: !isNaN(amount) ? amount : -1,
    price: !isNaN(price) ? price : -1,
  };
  return result;
}
