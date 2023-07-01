import { Stock, StockTransaction } from "../../models/Stock";
import {
  getStockProfit,
  sortStockTransactionTypes,
} from "../../util/stockFunctions";
import "./InactivePositionRow.css";

interface Props {
  stock: Stock;
  handleClick: () => void;
}

const InactivePositionRow = ({ stock, handleClick }: Props) => {
  // variables
  const { ticker, stockTransactions } = stock;
  const sortedTransactions: { [id: string]: StockTransaction[] } =
    sortStockTransactionTypes(stockTransactions);
  const stockProfit: number = getStockProfit(sortedTransactions);

  return (
    <tr className="InactivePositionRow">
      <td onClick={handleClick}>{ticker}</td>
      <td>{stockProfit}</td>
    </tr>
  );
};

export default InactivePositionRow;
