import { Table } from "react-bootstrap";
import { NavigateFunction } from "react-router-dom";

import { Stock } from "../../models/Stock";
import InactivePositionRow from "./InactivePositionRow";
import "./InactivePositionTable.css";

interface Props {
  inactivePositions: Stock[];
  navigate: NavigateFunction;
}

const InactivePositionTable = ({ inactivePositions, navigate }: Props) => {
  return (
    <Table className="InactivePositionTable">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Cash Returns</th>
        </tr>
      </thead>
      <tbody>
        {inactivePositions.map((stock) => (
          <InactivePositionRow
            key={stock.ticker}
            stock={stock}
            handleClick={() => navigate(`/position-details/${stock.ticker}`)}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default InactivePositionTable;
