import { getDateinDDFormat, getMonthInMMFormat } from '../utilities/date-utils'

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export interface DatePickerWrapperProps {
    value: number;
    onChange: (date: number) => void;
}

export function DatePickerWrapper(props: DatePickerWrapperProps) {
    function convertDateMsToString(ms: number) {
        const date = new Date(ms);
        const MM = getMonthInMMFormat(date.getMonth());
        const dd = getDateinDDFormat(date.getDate())
        const retVal = MM + "/" + dd + "/" + date.getFullYear().toString();
        return retVal;
    }

    function handleChange(date: MaterialUiPickersDate) {
        if (date) {
            props.onChange(date.getTime());
        }
    }

    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            margin="normal"
            format="MM/dd/yyyy"
            value={convertDateMsToString(props.value)}
            onChange={handleChange}
            variant="dialog"
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
        />
    </MuiPickersUtilsProvider>
}