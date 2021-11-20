import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';

import { ITransaction } from '../model/ITransaction';

export interface DataTableHeadProps {
    title: string;
    addRow: (data?: ITransaction) => void;
}
export function DataTableHead(props: DataTableHeadProps) {
    function handleAddRow() {
        props.addRow();
    }

    return <div >
        <Grid container spacing={3}>
            <Grid item xs={12} sm={1}>
                {/* Spacing */}
            </Grid>
            <Grid item xs={12} sm={3}>
                <h2>{props.title}</h2>
            </Grid>
            <Grid item xs={12} sm={3}>
                {/* Spacing */}
            </Grid>
            <Grid item xs={12} sm={4}>
                <h2><SearchIcon /><TextField disabled={true}></TextField></h2>
            </Grid>
            <Grid item xs={12} sm={1}>
                <h2><AddCircleOutlineIcon onClick={handleAddRow} /></h2>
            </Grid>
            <Grid item xs={12} sm={1}>
                {/* Spacing */}
            </Grid>
        </Grid>
    </div>
}