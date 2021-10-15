import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { DataTable } from './components/DataTable';
import { DollarCostAverages } from './components/DollarCostAverages';
import { ITransaction } from './model/ITransaction';
import { addTransaction, bulkAddTransactions, removeTransaction, selectTransactions, updateDollarCostAverageProfitSummary, updateDollarCostAverageSummary, updateDollarCostAverageTransactions, updateTransaction } from './slices/transactionsSlice';
import { convertTransactionsToDollarCostAverageData, summarizeDollarCostAverageTransactions, summarizeProfitsFromDollarCostAverageTransactions } from './utilities/transaction-utils';

function App() {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(selectTransactions);

  function handleCreateTransaction(transaction?: ITransaction) {
    dispatch(addTransaction(transaction ? transaction : null));
  }

  function handleUpdateTransaction(id: string, transaction: Partial<ITransaction>) {
    dispatch(updateTransaction({ id: id, transaction: transaction }));
  }

  function handleDeleteTransaction(id: string) {
    dispatch(removeTransaction({ id: id }));
  }

  function handleImportTransactionsComplete(transactions: ITransaction[]) {
    dispatch(bulkAddTransactions(transactions));
  }

  // leverage React to listen to changes in state and convert to chart data accordingly
  useEffect(() => {
    const dcaTransactions = convertTransactionsToDollarCostAverageData(transactions);
    const dcaSummary = summarizeDollarCostAverageTransactions(dcaTransactions);
    const dcaProfitSummary = summarizeProfitsFromDollarCostAverageTransactions(dcaTransactions, transactions);
    summarizeProfitsFromDollarCostAverageTransactions(dcaTransactions, transactions);
    dispatch(updateDollarCostAverageTransactions(dcaTransactions));
    dispatch(updateDollarCostAverageSummary(dcaSummary));
    dispatch(updateDollarCostAverageProfitSummary(dcaProfitSummary));
  }, [dispatch, transactions])
  return (
    <div>
      <DollarCostAverages></DollarCostAverages>
      <DataTable title="Cryptos" data={transactions} addRow={handleCreateTransaction} updateRow={handleUpdateTransaction} deleteRow={handleDeleteTransaction} onImportComplete={handleImportTransactionsComplete} ></DataTable>
      <div style={{ height: 100 }}></div>
    </div>
  );
}

export default App;
