import React from 'react';
import './DataTable.css'

import { ITransaction } from '../model/ITransaction';
import { convertCSVRowIntoTransactionRow, convertTransactionRowIntoCSVRows, createCSV } from '../utilities/csv-utils'
import { DataRow } from './DataRow';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { parse } from 'papaparse';
import { TableFooter } from '@material-ui/core';


export interface ITableProps {
    title: string;
    data: { [id: string]: ITransaction; }
    dcaData: { [id: string]: number };
    addRow: (data?: ITransaction) => void;
    updateRow: (id: string, row: Partial<ITransaction>) => void;
    deleteRow: (id: string) => void;
    onImportComplete: (data: ITransaction[]) => void;
}
export function DataTable(props: ITableProps) {

    function handleAddRow() {
        props.addRow();
    }
    function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (evt) => {
                /* Parse data */
                const bstr = evt.target?.result;
                if (bstr) {
                    const rows = parse(bstr.toString());
                    const dataRows: ITransaction[] = []
                    for (let i = 1; i < rows.data.length; i++) {
                        const row = rows.data[i] as string[];
                        const dataRow = convertCSVRowIntoTransactionRow(row);
                        dataRows.push(dataRow);
                    }
                    props.onImportComplete(dataRows);
                }
            };
            reader.readAsBinaryString(file);
        }
    }
    function handleExport() {
        const filename = props.title;
        const csvRows = convertTransactionRowIntoCSVRows(Object.values(props.data));
        const csvContent = createCSV(csvRows);
        const link = document.createElement('a');
        link.setAttribute('href', csvContent);
        link.setAttribute('download', filename + ".csv");
        link.click();
        link.remove();
    }

    return <div>
        <TableContainer component={Paper} >
            <div style={{ textAlign: 'center' }}>
                <h3>{props.title} <AddCircleOutlineIcon onClick={handleAddRow} /></h3>
            </div>
            <div style={{ maxHeight: 400, overflowX: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Symbol </TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {Object.entries(props.data).map((entry) => {
                            const uuid = entry[0];
                            const row = entry[1];
                            const amountRemaining = props.dcaData[uuid];
                            const isUsed = amountRemaining === 0 ? true : false;
                            return <DataRow key={uuid} uuid={uuid} data={row} isUsed={isUsed} addRow={props.addRow} updateRow={props.updateRow} deleteRow={props.deleteRow} />
                        })}
                    </TableBody>
                </Table>
            </div>
        </TableContainer>
        <div>
            <input type="file" accept=".csv" onChange={handleImport} />
            <Button onClick={handleExport}>Export</Button>
        </div>
    </div>
}

