import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

import UserProfile from "../../models/UserProfile";
import { addStockTransaction } from "../../util/stockFunctions";
import "./BuySharesForm.css";

interface Props {
  userProfile: UserProfile;
  ticker: string;
  handleClose: () => void;
  refreshProfile: () => Promise<void>;
}

const BuySharesForm = ({
  userProfile,
  ticker,
  handleClose,
  refreshProfile,
}: Props) => {
  // hooks
  const [quantity, setQuantity] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [date, setDate] = useState<string>("");

  // functions
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await addStockTransaction(userProfile, ticker, quantity, cost, date, "buy");
    await refreshProfile();

    handleClose();
  };

  return (
    <Form className="BuySharesForm">
      <Form.Group controlId="quantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="cost">
        <Form.Label>Cost</Form.Label>
        <Form.Control
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Group>
      <Button disabled={!quantity || !cost || !date} onClick={handleSubmit}>
        Add Transaction
      </Button>
    </Form>
  );
};

export default BuySharesForm;
