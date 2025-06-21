/* eslint-disable react-refresh/only-export-components */
import { getCurrentUser } from "../api/user.api";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import type { UserProfile } from "../types/User/User";

interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  userChanged: boolean;
  setUserChanged: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userChanged, setUserChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getCurrentUser();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserProfile(null);
      } finally {
        setUserChanged(false);
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userChanged]);

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        userChanged,
        isLoading,
        setUserChanged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
