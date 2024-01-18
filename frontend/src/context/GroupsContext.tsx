import { createContext, useContext, useState, useEffect } from "react";
import { getGroupsRequest } from "../services/groups";
import { useAuth } from "./AuthContext";

export const GroupsContext = createContext({
  getGroups: () => {},
  grupsUser: {},
});

export const useGroups = () => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const GroupsProvider = ({ children }: any) => {
  const [grupsUser, setGroupsUser] = useState<object | null>(null);

  const getGroups = async (userId: string) => {
    const res = await getGroupsRequest(userId);
    if (!res.error) {
      setGroupsUser(res.groups);
    }
  };

  const contextValue = {
    getGroups,
    grupsUser,
  };

  return (
    <GroupsContext.Provider value={contextValue}>
      {children}
    </GroupsContext.Provider>
  );
};
