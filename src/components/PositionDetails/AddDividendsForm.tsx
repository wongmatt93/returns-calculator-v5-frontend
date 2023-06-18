import "./AddDividendsForm.css";

interface Props {
  handleClose: () => void;
  refreshProfile: () => Promise<void>;
}

const AddDividendsForm = ({ handleClose, refreshProfile }: Props) => {
  return <div className="AddDividendsForm">AddDividendsForm works</div>;
};

export default AddDividendsForm;
