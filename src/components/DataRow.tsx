import { useState } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { TextField } from '@material-ui/core';

import { DatePickerWrapper } from './DatePickerWrapper';
import { ITransaction } from '../model/ITransaction';
import { roundDecimalPlaces } from '../utilities/number-utils';

export interface ITransactionProps {
    uuid: string;
    data: ITransaction;
    isUsed: boolean;
    addRow: (data?: ITransaction) => void;
    updateRow: (id: string, row: Partial<ITransaction>) => void;
    deleteRow: (id: string) => void;
}

export function DataRow(props: ITransactionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const dateTime = new Date(props.data.date);
    const commaFormatter = new Intl.NumberFormat('en-US');

    const buySell = props.data.amount === 0 ? "neither" : props.data.amount > 0 ? "buy" : "sell";
    const textColor = buySell === "buy" ? "red" : buySell === "sell" ? "green" : "black";
    const textDecoration = props.isUsed ? "line-through" : "none";

    function toggleIsEditing() {
        setIsEditing(!isEditing);
    }
    return <TableRow>
        <TableCell >
            {!isEditing ? <EditIcon onClick={(e) => { toggleIsEditing() }} /> : <SaveIcon onClick={(e) => { toggleIsEditing() }} />}
        </TableCell>
        <TableCell className="label-form" style={{ textDecoration: textDecoration }}>
            {!isEditing ?
                props.data.symbol :
                <TextField value={props.data.symbol} onChange={(e) => props.updateRow(props.uuid, { symbol: e.target.value })} variant="outlined"></TextField>
            }
        </TableCell>
        <TableCell className="label-date">
            {!isEditing ?
                dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString() :
                <DatePickerWrapper value={props.data.date} onChange={(date: number) => props.updateRow(props.uuid, { date: date })}></DatePickerWrapper>
            }
        </TableCell>
        <TableCell>
            {!isEditing ?
                props.data.amount :
                <TextField value={props.data.amount}
                    onChange={(e) => {
                        const amount = parseFloat(e.target.value);
                        if (amount) props.updateRow(props.uuid, { amount: amount });
                    }}
                    inputProps={{
                        inputMode: 'numeric', pattern: '[0-9]*',
                        style: { color: textColor }
                    }}
                    variant="outlined"
                ></TextField>
            }
        </TableCell>
        <TableCell>
            {!isEditing ?
                ("$" + commaFormatter.format(props.data.price)) :
                <TextField
                    onChange={(e) => {
                        const price = parseFloat(e.target.value);
                        if (price) props.updateRow(props.uuid, { price: price });
                    }}
                    value={props.data.price}
                    inputProps={{
                        inputMode: 'numeric', pattern: '[0-9]*',
                        style: { color: textColor }
                    }}
                    variant="outlined"
                ></TextField>
            }
        </TableCell>
        <TableCell>
            {!isEditing ?
                ("$" + commaFormatter.format(roundDecimalPlaces(props.data.price * props.data.amount, 2))) :
                <TextField
                    value={(props.data.price * props.data.amount).toFixed(2)}
                    inputProps={{
                        inputMode: 'numeric', pattern: '[0-9]*',
                        style: { color: textColor }
                    }}
                    variant="outlined"
                ></TextField>
            }
        </TableCell>
        <TableCell onClick={() => props.deleteRow(props.uuid)}><DeleteIcon /></TableCell>
    </TableRow >
}