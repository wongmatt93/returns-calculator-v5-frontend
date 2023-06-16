import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";

const Header = () => {
  const { userProfile } = useContext(AuthContext);

  return (
    <div className="Header flex">
      <h1 className="basis-1/4">
        <Link to="/">Cash</Link>
      </h1>
      <nav className="basis-1/2">
        <ul className="flex">
          <li className="basis-1/4">
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li className="basis-1/4">Wow</li>
          <li className="basis-1/4">Wow</li>
          <li className="basis-1/4">Wow</li>
        </ul>
      </nav>
      {!userProfile && (
        <button className="basis-1/4" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      )}
      {userProfile && (
        <button className="basis-1/4" onClick={signOut}>
          Sign out
        </button>
      )}
    </div>
  );
};

export default Header;
