import { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

import UserProfile from "../../models/UserProfile";
import TransactionsOffcanvas from "./TransactionsOffcanvas";
import "./PositionDetailsPage.css";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const PositionDetailsPage = ({ userProfile, refreshProfile }: Props) => {
  // hooks
  const [transactionType, setTransactionType] = useState<string>("");
  const ticker: string | undefined = useParams().ticker;

  // functions
  const handleClose = (): void => setTransactionType("");
  const handleShow = (transactionType: string): void =>
    setTransactionType(transactionType);

  return (
    <main className="PositionDetailsPage">
      {ticker && (
        <>
          <h2>{ticker}</h2>
          <Button onClick={() => handleShow("Buy Shares")}>Buy Shares</Button>
          <Button onClick={() => handleShow("Open Options")}>
            Open Options
          </Button>
          <Button onClick={() => handleShow("Add Dividends")}>
            Add Dividends
          </Button>
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
