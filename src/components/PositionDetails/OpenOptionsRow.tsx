import { useState } from "react";
import { Button } from "react-bootstrap";
import UserProfile from "../../models/UserProfile";

import CloseOptionsOffcanvas from "./CloseOptionsOffcanvas";
import "./OpenOptionsRow.css";

interface Props {
  userProfile: UserProfile;
  option: string;
  quantity: { [id: string]: number };
  refreshProfile: () => Promise<void>;
}

const OpenOptionsRow = ({
  userProfile,
  option,
  quantity,
  refreshProfile,
}: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  return (
    <>
      {Object.keys(quantity).map((optionType) => (
        <tr key={option + optionType} className="OpenOptionsRow">
          <td>{optionType.toUpperCase()}</td>
          <td>{option}</td>
          <td>{quantity[optionType]}</td>
          <td>
            <Button onClick={handleShow}>Close</Button>
          </td>
        </tr>
      ))}
      <CloseOptionsOffcanvas
        userProfile={userProfile}
        show={show}
        handleClose={handleClose}
        refreshProfile={refreshProfile}
      />
    </>
  );
};

export default OpenOptionsRow;
