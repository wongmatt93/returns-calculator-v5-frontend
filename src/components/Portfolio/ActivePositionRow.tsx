import { Stock } from "../../models/Stock";
import { getStockProfit } from "../../util/stockFunctions";
import "./ActivePositionRow.css";

interface Props {
  stock: Stock;
  handleClick: () => void;
}

const ActivePositionRow = ({ stock, handleClick }: Props) => {
  // variables
  const stockProfit: number = getStockProfit(stock.stockTransactions);

  return (
    <tr className="ActivePositionRow">
      <td onClick={handleClick}>{stock.ticker}</td>
      <td>{stockProfit}</td>
    </tr>
  );
};

export default ActivePositionRow;
