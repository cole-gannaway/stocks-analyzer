
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
    const buySell = props.data.amount === 0 ? "neither" : props.data.amount > 0 ? "buy" : "sell";
    const textColor = buySell === "buy" ? "red" : "green";
    return <TableRow>
        <TableCell className="label-form">
            <TextField value={props.data.symbol} onChange={(e) => props.updateRow(props.uuid, { symbol: e.target.value })} variant="outlined"></TextField>
        </TableCell>
        <TableCell className="label-date">
            <DatePickerWrapper value={props.data.date} onChange={(date: number) => props.updateRow(props.uuid, { date: date })}></DatePickerWrapper>
        </TableCell>
        <TableCell>
            <TextField type="number" value={props.data.amount}
                onChange={(e) => {
                    const amount = parseFloat(e.target.value);
                    if (amount) props.updateRow(props.uuid, { amount: amount });
                }}
                inputProps={{ style: { color: textColor } }}
                variant="outlined"
            ></TextField>
        </TableCell>
        <TableCell>
            <TextField type="number" value={props.data.price}
                onChange={(e) => {
                    const price = parseFloat(e.target.value);
                    if (price) props.updateRow(props.uuid, { price: price });
                }}
                inputProps={{ style: { color: textColor } }}
                variant="outlined"
            ></TextField>
        </TableCell>
        <TableCell>
            <TextField type="number" value={(props.data.price * props.data.amount).toFixed(2)}
                inputProps={{ style: { color: textColor } }}
                variant="outlined"
            ></TextField>
        </TableCell>
        <TableCell onClick={() => props.deleteRow(props.uuid)}><DeleteIcon /></TableCell>
    </TableRow >
}