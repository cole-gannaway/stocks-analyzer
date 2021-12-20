export interface IDashboardTD{
    value: number;
    formatter: (value: number) => string;
}
export function DashboardTD (props: IDashboardTD){
    const computeTextStyle = (val: number) => {
        if (val < 0) return "red";
        else if (val > 0) return "green";
        else return "black";
    }
    return <td style={{textAlign: "right", color: computeTextStyle(props.value)}}>{props.value === 0.0 ? "-" : props.formatter(props.value) }</td>

}
