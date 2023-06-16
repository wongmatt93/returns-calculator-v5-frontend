import { Tab, Tabs } from "react-bootstrap";
import UserProfile from "../../models/UserProfile";
import ActivePositionTable from "./ActivePositionTable";
import AddTickerForm from "./AddTickerForm";
import InactivePositionTable from "./InactivePositionTable";

import "./PortfolioPage.css";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const PortfolioPage = ({ userProfile, refreshProfile }: Props) => {
  return (
    <main className="PortfolioPage">
      <AddTickerForm
        userProfile={userProfile}
        refreshProfile={refreshProfile}
      />
      <Tabs defaultActiveKey="active" fill>
        <Tab eventKey="active" title="Active Positions">
          <ActivePositionTable />
        </Tab>
        <Tab eventKey="inactive" title="Inactive Positions">
          <InactivePositionTable />
        </Tab>
      </Tabs>
    </main>
  );
};

export default PortfolioPage;
