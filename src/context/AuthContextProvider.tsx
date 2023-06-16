import { ReactNode, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { addNewProfile, getProfileByUid } from "../services/userService";
import UserProfile from "../models/UserProfile";
import { auth } from "../firebaseConfig";

function AuthContextProvider({ children }: { children: ReactNode }) {
  // hooks
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      newUser &&
        getProfileByUid(newUser.uid).then((response) => {
          if (response) {
            setUserProfile(response);
          } else {
            const newUserProfile: UserProfile = {
              name: newUser.displayName,
              email: newUser.email,
              uid: newUser.uid,
              stocks: [],
            };
            setUserProfile(newUserProfile);
            addNewProfile(newUserProfile);
          }
        });
    });
  }, []);

  // functions
  const refreshProfile = async (): Promise<void> => {
    setUserProfile(await getProfileByUid(userProfile!.uid));
  };

  return (
    <AuthContext.Provider value={{ userProfile, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
