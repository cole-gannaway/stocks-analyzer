import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { DataTable } from './components/DataTable';
import { DollarCostAverages } from './components/DollarCostAverages';
import { ITransaction } from './model/ITransaction';
import { addTransaction, bulkAddTransactions, deleteAllTransactions, removeTransaction, selectDCATransactionsAmountRemaining, selectDCATransactionsMemoized, selectTransactions, updateDollarCostAverageProfitSummary, updateDollarCostAverageSummary, updateDollarCostAverageTransactions, updateTransaction } from './slices/transactionsSlice';
import { summarizeDollarCostAverageTransactions, summarizeProfitsFromDollarCostAverageTransactions } from './utilities/transaction-utils';
import { fetchCurrentCryptoPrices } from './slices/currentPricesSlice';


function App() {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(selectTransactions);
  const dcaTransactions = useAppSelector(selectDCATransactionsMemoized);
  const dcaTransactionsRemaining = useAppSelector(selectDCATransactionsAmountRemaining);

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
    dispatch(deleteAllTransactions());
    dispatch(bulkAddTransactions(transactions));
  }

  // on open, fetch current prices
  useEffect(() => {
    dispatch(fetchCurrentCryptoPrices())
  }, [dispatch])

  // leverage React to listen to changes in state and convert to chart data accordingly
  useEffect(() => {
    const dcaSummary = summarizeDollarCostAverageTransactions(dcaTransactions);
    const dcaProfitSummary = summarizeProfitsFromDollarCostAverageTransactions(dcaTransactions, transactions);
    summarizeProfitsFromDollarCostAverageTransactions(dcaTransactions, transactions);
    dispatch(updateDollarCostAverageTransactions(dcaTransactions));
    dispatch(updateDollarCostAverageSummary(dcaSummary));
    dispatch(updateDollarCostAverageProfitSummary(dcaProfitSummary));
  }, [dispatch, transactions, dcaTransactions])
  return (
    <div>
      <DollarCostAverages></DollarCostAverages>
      <DataTable title="Cryptos" data={transactions} dcaData={dcaTransactionsRemaining} addRow={handleCreateTransaction} updateRow={handleUpdateTransaction} deleteRow={handleDeleteTransaction} onImportComplete={handleImportTransactionsComplete} ></DataTable>
      <div style={{ height: 100 }}></div>
    </div>
  );
}

export default App;

