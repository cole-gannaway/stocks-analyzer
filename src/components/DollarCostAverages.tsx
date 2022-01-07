import { useAppSelector } from "../app/hooks";
import { selectCurrentPrices } from "../slices/currentPricesSlice";
import { selectAppliedTransactionsProfitSummary, selectAppliedTransactionsSummarized } from "../slices/transactionsSlice";
import { formatDollarAmount } from "../utilities/number-utils";
import { DashboardTD } from "./DashboardTD";

export function DollarCostAverages() {
    const dcaSummaries = useAppSelector(selectAppliedTransactionsSummarized);
    const dcaProfitSummary = useAppSelector(selectAppliedTransactionsProfitSummary);
    const currentPrices = useAppSelector(selectCurrentPrices);

    let currentValueSum = 0;
    let unrealizedProfitsSum = 0;
    let allTimeProfitsSum = 0;
    const dashboard = Object.entries(dcaProfitSummary.profits).map((entry) => {
        const symbol = entry[0];
        const profits = entry[1];
        const amount: number = dcaProfitSummary.notSoldAmount[symbol] ? dcaProfitSummary.notSoldAmount[symbol] : 0;
        const currentPrice: number | undefined = currentPrices[symbol];
        const currentValue = (currentPrice && amount) ? currentPrice * amount : 0;
        const dca = dcaSummaries[symbol] ? dcaSummaries[symbol].price : 0;
        const totalCost = dca * amount;
        const potentialEarnings = currentPrice * amount;
        const unrealizedProfits = potentialEarnings - totalCost;

        // update running totals
        currentValueSum += currentValue;
        unrealizedProfitsSum += unrealizedProfits;
        allTimeProfitsSum += profits;

        return <tr key={"dashboard-" + symbol}>
            <td>{symbol}</td>
            <DashboardTD value={currentValue} formatter={formatDollarAmount}></DashboardTD>
            <DashboardTD value={amount} formatter={(val) => val.toFixed(2)}></DashboardTD>
            <DashboardTD value={currentPrice} formatter={formatDollarAmount}></DashboardTD>
            <DashboardTD value={dca} formatter={formatDollarAmount}></DashboardTD>
            <DashboardTD value={(currentPrice && dca) ? ((currentPrice - dca) / dca * 100) : 0.0} formatter={(val) => val.toFixed(2) + "%"}></DashboardTD>
            <DashboardTD value={unrealizedProfits} formatter={formatDollarAmount}></DashboardTD>
            <DashboardTD value={profits} formatter={formatDollarAmount}></DashboardTD>
        </tr>
    });

    return <div style={{textAlign:"center", padding:"40px"}}>
        <h1>Dashboard</h1>
        <table style={{marginLeft : "auto", marginRight: "auto", width:"100%"}}>
            <thead>
                <tr>
                    <th>Symbol</th><th>Current Value</th><th>Amount</th><th>Current Price</th><th>Dollar Cost Average</th><th>% Return</th><th>Unrealized Profits</th><th>All Time Profits</th>
                </tr>
            </thead>
            <tbody>
                {dashboard}
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <DashboardTD value={currentValueSum} formatter={formatDollarAmount}></DashboardTD>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <DashboardTD value={unrealizedProfitsSum} formatter={formatDollarAmount}></DashboardTD>
                    <DashboardTD value={allTimeProfitsSum} formatter={formatDollarAmount}></DashboardTD>
                </tr>
            </tfoot>

        </table>
    </div>
}