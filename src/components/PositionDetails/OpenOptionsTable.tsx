import { OptionTransaction } from "../../models/Stock";
import UserProfile from "../../models/UserProfile";
import { getOpenOptions } from "../../util/optionFunctions";
import OpenOptionsRow from "./OpenOptionsRow";
import "./OpenOptionsTable.css";

interface Props {
  userProfile: UserProfile;
  optionTransactions: OptionTransaction[];
  refreshProfile: () => Promise<void>;
}

const OpenOptionsTable = ({
  userProfile,
  optionTransactions,
  refreshProfile,
}: Props) => {
  // variables
  const openOptions: { [id: string]: { [id: string]: number } } =
    getOpenOptions(optionTransactions);

  return (
    <table className="OpenOptionsTable">
      <thead>
        <tr>
          <th>Type</th>
          <th>Option</th>
          <th>Quantity</th>
          <th>Close?</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(openOptions).map((openOption) => (
          <OpenOptionsRow
            key={openOption}
            userProfile={userProfile}
            option={openOption}
            quantity={openOptions[openOption]}
            refreshProfile={refreshProfile}
          />
        ))}
      </tbody>
    </table>
  );
};

export default OpenOptionsTable;
