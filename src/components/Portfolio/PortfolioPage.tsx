import { Tab, Tabs } from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";

import AddTickerForm from "./AddTickerForm";
import ActivePositionTable from "./ActivePositionTable";
import InactivePositionTable from "./InactivePositionTable";
import { Stock, StockTransaction } from "../../models/Stock";
import UserProfile from "../../models/UserProfile";
import {
  getCurrentStockQuantity,
  sortStockTransactionTypes,
} from "../../util/stockFunctions";

import "./PortfolioPage.css";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const PortfolioPage = ({ userProfile, refreshProfile }: Props) => {
  // hooks
  const navigate: NavigateFunction = useNavigate();

  // variables
  const activePositions: Stock[] = [];
  const inactivePositions: Stock[] = [];

  // sort stock positions
  userProfile.stocks.forEach((stock) => {
    const sortedTransactions: { [id: string]: StockTransaction[] } =
      sortStockTransactionTypes(stock.stockTransactions);
    const currentStockQuantity: number =
      getCurrentStockQuantity(sortedTransactions);

    currentStockQuantity > 0
      ? activePositions.push(stock)
      : inactivePositions.push(stock);
  });

  return (
    <main className="PortfolioPage">
      <AddTickerForm
        userProfile={userProfile}
        refreshProfile={refreshProfile}
      />
      <Tabs defaultActiveKey="active" fill>
        <Tab eventKey="active" title="Active Positions">
          <ActivePositionTable
            activePositions={activePositions}
            navigate={navigate}
          />
        </Tab>
        <Tab eventKey="inactive" title="Inactive Positions">
          <InactivePositionTable
            inactivePositions={inactivePositions}
            navigate={navigate}
          />
        </Tab>
      </Tabs>
    </main>
  );
};

export default PortfolioPage;
