import { Offcanvas } from "react-bootstrap";

import UserProfile from "../../models/UserProfile";
import AddDividendsForm from "./AddDividendsForm";
import BuySharesForm from "./BuySharesForm";
import OpenOptionsForm from "./OpenOptionsForm";
import SellSharesForm from "./SellSharesForm";

import "./TransactionsOffcanvas.css";

interface Props {
  userProfile: UserProfile;
  ticker: string;
  transactionType: string;
  handleClose: () => void;
  refreshProfile: () => Promise<void>;
}

const TransactionsOffcanvas = ({
  userProfile,
  ticker,
  transactionType,
  handleClose,
  refreshProfile,
}: Props) => {
  return (
    <Offcanvas
      className="TransactionsOffcanvas"
      show={Boolean(transactionType)}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header>
        <Offcanvas.Title>{transactionType}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {transactionType === "Buy Shares" && (
          <BuySharesForm
            userProfile={userProfile}
            ticker={ticker}
            handleClose={handleClose}
            refreshProfile={refreshProfile}
          />
        )}
        {transactionType === "Sell Shares" && (
          <SellSharesForm
            handleClose={handleClose}
            refreshProfile={refreshProfile}
          />
        )}
        {transactionType === "Open Options" && (
          <OpenOptionsForm
            handleClose={handleClose}
            refreshProfile={refreshProfile}
          />
        )}
        {transactionType === "Add Dividends" && (
          <AddDividendsForm
            handleClose={handleClose}
            refreshProfile={refreshProfile}
          />
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default TransactionsOffcanvas;
