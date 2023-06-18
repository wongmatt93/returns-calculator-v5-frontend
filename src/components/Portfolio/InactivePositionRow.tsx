import { Stock } from "../../models/Stock";
import { getStockProfit } from "../../util/stockFunctions";
import "./InactivePositionRow.css";

interface Props {
  stock: Stock;
  handleClick: () => void;
}

const InactivePositionRow = ({ stock, handleClick }: Props) => {
  // variables
  const { ticker, stockTransactions } = stock;
  const stockProfit: number = getStockProfit(stockTransactions);

  return (
    <tr className="InactivePositionRow">
      <td onClick={handleClick}>{ticker}</td>
      <td>{stockProfit}</td>
    </tr>
  );
};

export default InactivePositionRow;
