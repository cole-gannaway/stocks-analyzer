import { Grid } from "@material-ui/core";
import { useAppSelector } from "../app/hooks";
import { selectCurrentPrices, selectDCAProfitSummary, selectDCASummaries } from "../slices/transactionsSlice";

export function DollarCostAverages() {
    const dcaSummaries = useAppSelector(selectDCASummaries);
    const dcaProfitSummary = useAppSelector(selectDCAProfitSummary);
    const currentPrices = useAppSelector(selectCurrentPrices);

    const symbols = Object.keys(dcaSummaries);
    const symbolsAndPrices = symbols.filter(symbol => currentPrices[symbol]).map(symbol => {
        return { symbol: symbol, price: currentPrices[symbol] };
    });

    return <div>
        <h3>Wallet</h3>
        <table key="wallet">
            <tbody>
                {Object.entries(dcaProfitSummary.notSoldAmount).map((entry) => {
                    const symbol = entry[0];
                    const amount = entry[1];
                    return <tr key={"wallet-" + symbol}><td>{symbol}</td><td>{amount.toFixed(2)}</td></tr>
                })}
            </tbody>
        </table>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <h3>Dollar Cost Averages</h3>
                <table key={"dca-summary"}>
                    <tbody>
                        {Object.entries(dcaSummaries).map((entry) => {
                            const symbol = entry[0];
                            const summary = entry[1];
                            return <tr key={"dca-summary-" + symbol}><td>{symbol}</td><td>${summary.price.toFixed(4)}</td></tr>
                        })}
                    </tbody>
                </table>

            </Grid>
            <Grid item xs={12} sm={6}>
                <h3>Current Prices</h3>
                <table key={"current-prices"}>
                    <tbody>
                        {symbolsAndPrices.map(data => {
                            return <tr key={"current-prices-" + data.symbol}><td>{data.symbol}</td><td>${data.price.toFixed(2)}</td></tr>
                        })}
                    </tbody>
                </table>

            </Grid>
            <Grid item xs={12} sm={6}>
                <h3>Unrealized Profits</h3>
                <table key="dca-unrealized-profits">
                    <tbody>
                        {Object.entries(dcaProfitSummary.notSoldAmount).map((entry) => {
                            const symbol = entry[0];
                            const amount = entry[1];
                            const dcaPrice = dcaSummaries[symbol].price;
                            const totalCost = dcaPrice * amount;
                            const potentialEarnings = currentPrices[symbol] * amount;
                            const unrealizedProfits = potentialEarnings - totalCost;
                            return <tr key={"dca-unrealized-profits-" + symbol}><td>{symbol}</td><td>${unrealizedProfits.toFixed(2)}</td></tr>
                        })}
                    </tbody>
                </table>
            </Grid>
            <Grid item xs={12} sm={6}>
                <h3>Profits</h3>
                <table key="dca-profits">
                    <tbody>
                        {Object.entries(dcaProfitSummary.profits).map((entry) => {
                            const symbol = entry[0];
                            const profits = entry[1];
                            return <tr key={"dca-profits-" + symbol}><td>{symbol}</td><td>${profits.toFixed(2)}</td></tr>
                        })}
                    </tbody>
                </table>
            </Grid>
        </Grid>

    </div>
}