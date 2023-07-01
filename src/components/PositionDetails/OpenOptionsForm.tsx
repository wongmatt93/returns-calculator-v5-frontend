import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

import UserProfile from "../../models/UserProfile";
import { addOptionTransaction } from "../../util/optionFunctions";
import "./OpenOptionsForm.css";

interface Props {
  userProfile: UserProfile;
  ticker: string;
  handleClose: () => void;
  refreshProfile: () => Promise<void>;
}

const OpenOptionsForm = ({
  userProfile,
  ticker,
  handleClose,
  refreshProfile,
}: Props) => {
  // hooks
  const [quantity, setQuantity] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [strikePrice, setStrikePrice] = useState<string>("");
  const [callPut, setCallPut] = useState<string>("C");
  const [transactionType, setTransactionType] = useState<string>("bto");
  const [premium, setPremium] = useState<string>("");
  const [transactionDate, setTransactionDate] = useState<string>("");

  // variables
  const disabled: boolean =
    !quantity ||
    !expirationDate ||
    !strikePrice ||
    !premium ||
    !transactionDate;

  // functions
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await addOptionTransaction(
      userProfile,
      ticker,
      quantity,
      expirationDate,
      strikePrice,
      callPut,
      transactionType,
      premium,
      transactionDate
    );
    await refreshProfile();

    handleClose();
  };

  return (
    <Form className="OpenOptionsForm">
      <Form.Group controlId="quantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="expiration-date">
        <Form.Label>Expiration Date</Form.Label>
        <Form.Control
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="strike">
        <Form.Label>Strike Price</Form.Label>
        <Form.Control
          type="number"
          value={strikePrice}
          onChange={(e) => setStrikePrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="callPut">
        <Form.Label>Call/Put</Form.Label>
        <Form.Select
          value={callPut}
          onChange={(e) => setCallPut(e.target.value)}
        >
          <option value="C">Call</option>
          <option value="P">Put</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="transactionType">
        <Form.Label>Transaction Type</Form.Label>
        <Form.Select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="bto">Buy To Open</option>
          <option value="sto">Sell To Open</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="cost">
        <Form.Label>Premium</Form.Label>
        <Form.Control
          type="number"
          value={premium}
          onChange={(e) => setPremium(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="transaction-date">
        <Form.Label>Transaction Date</Form.Label>
        <Form.Control
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
        />
      </Form.Group>
      <Button disabled={disabled} onClick={handleSubmit}>
        Add Transaction
      </Button>
    </Form>
  );
};

export default OpenOptionsForm;
