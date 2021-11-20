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

export interface IDataRowProps {
    uuid: string;
    data: ITransaction;
    isUsed: boolean;
    updateRow: (id: string, row: Partial<ITransaction>) => void;
    deleteRow: (id: string) => void;
}
export function DataRow(props: IDataRowProps) {
    const [isEditing, setIsEditing] = useState(false);

    // variables for editing
    const [symbol, setSymbol] = useState(props.data.symbol);
    const [date, setDate] = useState(props.data.date);
    const [amount, setAmount] = useState(props.data.amount);
    const [price, setPrice] = useState(props.data.price);

    const dateTime = new Date(props.data.date);
    const commaFormatter = new Intl.NumberFormat('en-US');

    // styles
    const buySell = props.data.amount === 0 ? "neither" : props.data.amount > 0 ? "buy" : "sell";
    const textColor = buySell === "buy" ? "red" : buySell === "sell" ? "green" : "black";
    const strikeThrough = props.isUsed ? "line-through" : "none";

    function toggleIsEditing() {
        setIsEditing(!isEditing);
    }
    function onSave() {
        props.updateRow(props.uuid, {
            symbol: symbol,
            date: date,
            amount: amount,
            price: price,
        })
        toggleIsEditing();
    }

    return <TableRow>
        <TableCell >
            {!isEditing ?
                <EditIcon onClick={(e) => { toggleIsEditing() }} /> :
                <SaveIcon onClick={(e) => onSave()} />
            }
        </TableCell>
        <TableCell style={{ minWidth: 80, textDecoration: strikeThrough }}>
            {!isEditing ?
                props.data.symbol :
                <TextField value={symbol} onChange={(e) => setSymbol(e.target.value)} variant="outlined" inputProps={{ style: { minWidth: '60' } }}></TextField>
            }
        </TableCell>
        <TableCell >
            {!isEditing ?
                dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString() :
                <div style={{ minWidth: 140 }}><DatePickerWrapper value={props.data.date} onChange={(date: number) => setDate(date)} ></DatePickerWrapper></div>
            }
        </TableCell>
        <TableCell style={{ color: textColor }}>
            {!isEditing ?
                props.data.amount :
                <TextField type="number" value={amount}
                    onChange={(e) => {
                        const amount = parseFloat(e.target.value);
                        if (amount) setAmount(amount);
                    }}
                    inputProps={{ style: { color: textColor } }}
                    style={{ minWidth: 100 }}
                    variant="outlined"
                ></TextField>
            }
        </TableCell>
        <TableCell style={{ color: textColor }}>
            {!isEditing ?
                ("$" + commaFormatter.format(props.data.price)) :
                <TextField type="number" value={price}
                    onChange={(e) => {
                        const price = parseFloat(e.target.value);
                        if (price) setPrice(price);
                    }}
                    inputProps={{ style: { color: textColor } }}
                    style={{ minWidth: 100 }}
                    variant="outlined"
                ></TextField>
            }
        </TableCell>
        <TableCell style={{ color: textColor }}>
            {!isEditing ?
                ("$" + commaFormatter.format(roundDecimalPlaces(props.data.price * props.data.amount, 2))) :
                ("$" + commaFormatter.format(roundDecimalPlaces(price * amount, 2)))
            }
        </TableCell>
        <TableCell onClick={() => props.deleteRow(props.uuid)}><DeleteIcon /></TableCell>
    </TableRow >
}