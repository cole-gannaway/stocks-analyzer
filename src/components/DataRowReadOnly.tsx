import { ITransaction } from '../model/ITransaction';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import { formatWithCommas, roundDecimalPlaces } from '../utilities/number-utils';

export interface ITransactionProps {
    uuid: string;
    data: ITransaction;
    addRow: (data?: ITransaction) => void;
    updateRow: (id: string, row: Partial<ITransaction>) => void;
    deleteRow: (id: string) => void;
}
export function DataRowReadOnly(props: ITransactionProps) {
    const buySell = props.data.amount === 0 ? "neither" : props.data.amount > 0 ? "buy" : "sell";
    const textColor = buySell === "buy" ? "red" : buySell === "sell" ? "green" : "black";
    const dateTime = new Date(props.data.date);
    const commaFormatter = new Intl.NumberFormat('en-US');
    return <TableRow>
        <TableCell>
            <DeleteIcon />
        </TableCell>
        <TableCell className="label-form">
            {props.data.symbol}
        </TableCell>
        <TableCell className="label-date">
            {dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString()}
        </TableCell>
        <TableCell>
            {props.data.amount}
        </TableCell>
        <TableCell style={{ color: textColor }}>
            ${commaFormatter.format(props.data.price)}
        </TableCell>
        <TableCell style={{ color: textColor }}>
            ${commaFormatter.format(roundDecimalPlaces(props.data.price * props.data.amount, 2))}
        </TableCell>
        <TableCell onClick={() => props.deleteRow(props.uuid)}><DeleteIcon /></TableCell>
    </TableRow >
}