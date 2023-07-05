import { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

import UserProfile from "../../models/UserProfile";
import { Stock } from "../../models/Stock";
import TransactionsOffcanvas from "./TransactionsOffcanvas";
import "./PositionDetailsPage.css";
import OpenOptionsTable from "./OpenOptionsTable";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const PositionDetailsPage = ({ userProfile, refreshProfile }: Props) => {
  // hooks
  const [transactionType, setTransactionType] = useState<string>("");
  const ticker: string | undefined = useParams().ticker;

  // variables
  // checks to see if user has this stock in their portfolio
  const userStockPosition: Stock | undefined = userProfile.stocks.find(
    (stock) => stock.ticker === ticker
  );

  // functions
  const handleClose = (): void => setTransactionType("");
  const handleShow = (transactionType: string): void =>
    setTransactionType(transactionType);

  return (
    <main className="PositionDetailsPage">
      {ticker && userStockPosition && (
        <>
          <h2>{ticker}</h2>
          <Button onClick={() => handleShow("Buy Shares")}>Buy Shares</Button>
          <Button onClick={() => handleShow("Open Options")}>
            Open Options
          </Button>
          <Button onClick={() => handleShow("Add Dividends")}>
            Add Dividends
          </Button>
          <OpenOptionsTable
            userProfile={userProfile}
            optionTransactions={userStockPosition.optionTransactions}
            refreshProfile={refreshProfile}
          />
          <TransactionsOffcanvas
            userProfile={userProfile}
            ticker={ticker}
            transactionType={transactionType}
            handleClose={handleClose}
            refreshProfile={refreshProfile}
          />
        </>
      )}
    </main>
  );
};

export default PositionDetailsPage;
