
import { DatePickerWrapper } from './DatePickerWrapper';
import { ITransaction } from '../model/ITransaction';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField } from '@material-ui/core';

export interface ITransactionProps {
    uuid: string;
    data: ITransaction;
    addRow: (data?: ITransaction) => void;
    updateRow: (id: string, row: Partial<ITransaction>) => void;
    deleteRow: (id: string) => void;
}
export function DataRow(props: ITransactionProps) {

    return <TableRow>
        <TableCell className="label-form">
            <TextField value={props.data.symbol} onChange={(e) => props.updateRow(props.uuid, { symbol: e.target.value })}></TextField>
        </TableCell>
        <TableCell className="label-date">
            <DatePickerWrapper value={props.data.date} onChange={(date: number) => props.updateRow(props.uuid, { date: date })}></DatePickerWrapper>
        </TableCell>
        <TableCell>
            <TextField type="number" value={props.data.amount} onChange={(e) => {
                const amount = parseFloat(e.target.value);
                if (amount) props.updateRow(props.uuid, { amount: amount });
            }}></TextField>
        </TableCell>
        <TableCell>
            {"$ "}
            <TextField type="number" value={props.data.price} onChange={(e) => {
                const price = parseFloat(e.target.value);
                if (price) props.updateRow(props.uuid, { price: price });
            }}></TextField>
        </TableCell>
        <TableCell onClick={() => props.deleteRow(props.uuid)}><DeleteIcon /></TableCell>
    </TableRow>
}