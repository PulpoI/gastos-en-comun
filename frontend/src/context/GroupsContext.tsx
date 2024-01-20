import { createContext, useContext, useState, useEffect } from "react";
import { getGroupExpensesRequest, getGroupsRequest } from "../services/groups";
import { useAuth } from "./AuthContext";

export const GroupsContext = createContext({
  getGroups: () => {},
  grupsUser: {},
  getGroupExpenses: () => {},
  groupExpenses: {},
  totalExpenses: 0,
  averageExpense: 0,
  userDetails: {},
  message: [],
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
  const [groupExpenses, setGroupExpenses] = useState<object | null>(null);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [averageExpense, setAverageExpense] = useState<number>(0);
  const [userDetails, setUserDetails] = useState<object | null>(null);
  const [message, setMessage] = useState([]);

  const getGroups = async (userId: string) => {
    const res = await getGroupsRequest(userId);
    if (!res.error) {
      setGroupsUser(res.groups);
    }
  };

  const getGroupExpenses = async (groupId: string) => {
    const res = await getGroupExpensesRequest(groupId);
    if (!res.error) {
      setGroupExpenses(res.expenses);
      setTotalExpenses(res.totalExpenses);
      setAverageExpense(res.averageExpense);
      setUserDetails(res.userDetails);
      setMessage(res.message);
    }
  };

  const contextValue = {
    getGroups,
    grupsUser,
    getGroupExpenses,
    groupExpenses,
    totalExpenses,
    averageExpense,
    userDetails,
    message,
  };

  return (
    <GroupsContext.Provider value={contextValue}>
      {children}
    </GroupsContext.Provider>
  );
};
