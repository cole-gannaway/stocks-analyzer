import { useAppSelector } from "../app/hooks";
import { selectCurrentPrices } from "../slices/currentPricesSlice";
import { selectDCAProfitSummary, selectDCASummaries } from "../slices/transactionsSlice";
import { toFixedUnlessZero } from "../utilities/number-utils";

export function DollarCostAverages() {
    const dcaSummaries = useAppSelector(selectDCASummaries);
    const dcaProfitSummary = useAppSelector(selectDCAProfitSummary);
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
        currentValueSum+= currentValue;
        unrealizedProfitsSum += unrealizedProfits;
        allTimeProfitsSum += profits;

        return <tr key={"dashboard-" + symbol}>
            <td>{symbol}</td>
            <td>{currentValue !== 0 ? "$" + toFixedUnlessZero(currentValue, 2) : "-"}</td>
            <td>{amount ? amount.toFixed(2) : "-"}</td>
            <td>{currentPrice ? "$" + toFixedUnlessZero(currentPrice, 2) : "-"}</td>
            <td>{dca !== 0 ? "$" + toFixedUnlessZero(dca, 2) : "-"}</td>
            <td>{dca !== 0 ? toFixedUnlessZero(((currentPrice - dca) / dca * 100), 2) + "%" : "-"}</td>
            <td>{unrealizedProfits !== 0 ? "$" + toFixedUnlessZero(unrealizedProfits, 2) : "-"}</td>
            <td>{profits !== 0 ? "$" + toFixedUnlessZero(profits, 2) : "-"}</td>
        </tr>
    });

    return <div style={{textAlign: "center"}}>
        <h1>Dashboard</h1>
        <table>
            <thead>
                <tr>
                    <th>Symbol</th><th>Current Value</th><th>Amount</th><th>Current Price</th><th>Dollar Cost Average</th><th>% Return</th><th>Unrealized Profits</th><th>All Time Profits</th>
                </tr>
            </thead>
            {dashboard}
            <tfoot>
                <tr>
                <td>Total</td><td>{"$" + toFixedUnlessZero(currentValueSum,2)}</td><td></td><td></td><td></td><td></td><td>{"$" + toFixedUnlessZero(unrealizedProfitsSum,2)}</td><td>{"$" + toFixedUnlessZero(allTimeProfitsSum,2)}</td>
                </tr>
            </tfoot>

        </table>
    </div>
}