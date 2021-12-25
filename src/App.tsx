import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { DataTable } from './components/DataTable';
import { DollarCostAverages } from './components/DollarCostAverages';
import { ITransaction } from './model/ITransaction';
import { addTransaction, bulkAddTransactions, deleteAllTransactions, removeTransaction, selectDCATransactionsAmountRemaining, selectTransactions, updateTransaction } from './slices/transactionsSlice';
import { updateCurrentPrices } from './slices/currentPricesSlice';

import { onValue, ref } from 'firebase/database';
import { CryptoDictionary, database } from './firebase/firebase';

// Testing only
import { current_data } from './config/current_data'


function App() {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(selectTransactions);
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

    // const dbRef = ref(database);

    // // subscribe
    // const unsubscribe = onValue(dbRef, (snapshot) => {
    //   if (snapshot.exists()) {
    //     const cryptoPrices = snapshot.val().cryptos as CryptoDictionary;
    //     console.log(cryptoPrices);

    //     dispatch(updateCurrentPrices(cryptoPrices));
    //   } else {
    //     console.log('No data available');
    //   }
    // });

    // return () => {
    //   unsubscribe();
    // }
    let cryptos: any = {}
    current_data.data.forEach((data) => {
      cryptos[data.symbol] = data.quote.USD.price
    })
    console.log(cryptos)
    dispatch(updateCurrentPrices(cryptos))
  }, [dispatch])

  return (
    <div>
      <DollarCostAverages></DollarCostAverages>
      <DataTable title="Cryptos" data={transactions} dcaData={dcaTransactionsRemaining} addRow={handleCreateTransaction} updateRow={handleUpdateTransaction} deleteRow={handleDeleteTransaction} onImportComplete={handleImportTransactionsComplete} ></DataTable>
      <div style={{ height: 100 }}></div>
    </div>
  );
}

export default App;

