import { FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";

import UserProfile from "../../models/UserProfile";
import { Stock } from "../../models/Stock";
import { addNewStock } from "../../services/userService";
import "./AddTickerForm.css";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const AddTickerForm = ({ userProfile, refreshProfile }: Props) => {
  // hooks
  const [ticker, setTicker] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  // functions
  const formSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);

    // check to see if ticker already exists
    if (userProfile.stocks.some((stock) => stock.ticker === ticker)) {
      alert("This stock is already in your portfolio");
      setSubmitting(false);
    } else {
      // create Stock object to add to database
      const newStock: Stock = {
        ticker,
        stockTransactions: [],
        optionTransactions: [],
        dividendTransactions: [],
      };

      // api call to send new Stock object to database
      await addNewStock(newStock, userProfile.uid);
      await refreshProfile();

      setSubmitting(false);
      setTicker("");
    }
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Stock Ticker</Form.Label>
        <Form.Control
          type="text"
          value={ticker}
          onChange={(e) =>
            setTicker(e.target.value.toUpperCase().replace(/\s/g, ""))
          }
        />
      </Form.Group>
      <Button
        variant="primary"
        disabled={!Boolean(ticker) || submitting}
        onClick={formSubmit}
      >
        Add Stock
      </Button>
    </Form>
  );
};

export default AddTickerForm;
