import "./OpenOptionsForm.css";

interface Props {
  handleClose: () => void;
  refreshProfile: () => Promise<void>;
}

const OpenOptionsForm = ({ handleClose, refreshProfile }: Props) => {
  return <div className="OpenOptionsForm">OpenOptionsForm works</div>;
};

export default OpenOptionsForm;
