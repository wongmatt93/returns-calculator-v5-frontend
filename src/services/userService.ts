import axios from "axios";
import { Stock } from "../models/Stock";
import UserProfile from "../models/UserProfile";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getProfileByUid = async (
  uid: string
): Promise<UserProfile | null> =>
  (await axios.get(`${baseURL}/user_profiles/${uid}`)).data;

export const addNewProfile = async (
  profile: UserProfile
): Promise<UserProfile> =>
  (await axios.post(`${baseURL}/user_profiles`, profile)).data;

export const updateUserProfile = async (
  userProfile: UserProfile
): Promise<Stock> =>
  (await axios.put(`${baseURL}/user_profiles/${userProfile.uid}`, userProfile))
    .data;
