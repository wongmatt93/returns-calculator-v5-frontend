import { Stock, StockTransaction } from "../../models/Stock";
import {
  getCurrentStockCostBasis,
  getCurrentStockQuantity,
  getStockProfit,
  sortStockTransactionTypes,
} from "../../util/stockFunctions";
import "./ActivePositionRow.css";

interface Props {
  stock: Stock;
  handleClick: () => void;
}

const ActivePositionRow = ({ stock, handleClick }: Props) => {
  // variables
  const { stockTransactions } = stock;
  const sortedTransactions: { [id: string]: StockTransaction[] } =
    sortStockTransactionTypes(stockTransactions);
  const stockQuantity: number = getCurrentStockQuantity(sortedTransactions);
  const stockCostBasis: number = getCurrentStockCostBasis(sortedTransactions);
  const stockProfit: number = getStockProfit(sortedTransactions);

  return (
    <tr className="ActivePositionRow">
      <td onClick={handleClick}>{stock.ticker}</td>
      <td>{stockQuantity}</td>
      <td>{stockCostBasis}</td>
      <td>{stockProfit}</td>
    </tr>
  );
};

export default ActivePositionRow;
