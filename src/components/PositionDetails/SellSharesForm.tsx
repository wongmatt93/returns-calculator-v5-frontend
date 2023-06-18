import "./SellSharesForm.css";

interface Props {
  handleClose: () => void;
  refreshProfile: () => Promise<void>;
}

const SellSharesForm = ({ handleClose, refreshProfile }: Props) => {
  return <div className="SellSharesForm">SellSharesForm works</div>;
};

export default SellSharesForm;
