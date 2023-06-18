import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import PortfolioPage from "./components/Portfolio/PortfolioPage";

import "./App.css";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import PositionDetailsPage from "./components/PositionDetails/PositionDetailsPage";

function App() {
  const { userProfile, refreshProfile } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        {userProfile && (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/portfolio"
                element={
                  <PortfolioPage
                    userProfile={userProfile}
                    refreshProfile={refreshProfile}
                  />
                }
              />
              <Route
                path="/position-details/:ticker"
                element={
                  <PositionDetailsPage
                    userProfile={userProfile}
                    refreshProfile={refreshProfile}
                  />
                }
              />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
