import { createContext } from "react";
import UserProfile from "../models/UserProfile";

export interface AuthContextModel {
  userProfile: UserProfile | null; // null when not logged in
  refreshProfile: () => Promise<void>;
}

const defaultValue: AuthContextModel = {
  userProfile: null,
  refreshProfile: async () => {},
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
