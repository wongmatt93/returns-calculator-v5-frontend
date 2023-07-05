import { Offcanvas } from "react-bootstrap";
import UserProfile from "../../models/UserProfile";

import CloseOptionsForm from "./CloseOptionsForm";
import "./CloseOptionsOffcanvas.css";

interface Props {
  userProfile: UserProfile;
  show: Boolean;
  handleClose: () => void;
  refreshProfile: () => Promise<void>;
}

const CloseOptionsOffcanvas = ({ show, handleClose }: Props) => {
  return (
    <Offcanvas
      className="CloseOptionsOffcanvas"
      show={show}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header>
        <Offcanvas.Title>Close Options</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <CloseOptionsForm />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CloseOptionsOffcanvas;
