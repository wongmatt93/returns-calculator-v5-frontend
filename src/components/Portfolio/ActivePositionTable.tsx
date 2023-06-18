import { Table } from "react-bootstrap";
import { NavigateFunction } from "react-router-dom";

import { Stock } from "../../models/Stock";
import ActivePositionRow from "./ActivePositionRow";
import "./ActivePositionTable.css";

interface Props {
  activePositions: Stock[];
  navigate: NavigateFunction;
}

const ActivePositionTable = ({ activePositions, navigate }: Props) => {
  return (
    <Table className="ActivePositionTable">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Shares</th>
          <th>Options</th>
          <th>Cost Basis</th>
          <th>% of Portfolio</th>
          <th>Cash Returns</th>
        </tr>
      </thead>
      <tbody>
        {activePositions.map((stock) => (
          <ActivePositionRow
            stock={stock}
            handleClick={() => navigate(`/position-details/${stock.ticker}`)}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default ActivePositionTable;
