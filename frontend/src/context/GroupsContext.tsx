import { createContext, useContext, useState, useEffect } from "react";
import { getGroupExpensesRequest, getGroupsRequest } from "../services/groups";
import { useAuth } from "./AuthContext";

export const GroupsContext = createContext({
  loading: false,
  getGroups: () => {},
  grupsUser: {},
  getGroupExpenses: () => {},
  groupExpenses: {},
  groupName: "",
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
  const [loading, setLoading] = useState<boolean>(false);
  const [grupsUser, setGroupsUser] = useState<object | null>(null);
  const [groupExpenses, setGroupExpenses] = useState<object | null>(null);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [averageExpense, setAverageExpense] = useState<number>(0);
  const [userDetails, setUserDetails] = useState<object | null>(null);
  const [message, setMessage] = useState([]);
  const [groupName, setGroupName] = useState<string>("");

  const getGroups = async (userId: string) => {
    setLoading(true);
    const res = await getGroupsRequest(userId);
    if (!res.error) {
      setGroupsUser(res.groups);
      setLoading(false);
    }
  };

  const getGroupExpenses = async (groupId: string) => {
    setLoading(true);
    const res = await getGroupExpensesRequest(groupId);
    if (!res.error) {
      setGroupExpenses(res.expenses);
      setTotalExpenses(res.totalExpenses);
      setAverageExpense(res.averageExpense);
      setUserDetails(res.userDetails);
      setMessage(res.message);
      setGroupName(res.groupName);
      setLoading(false);
    }
  };

  const contextValue = {
    loading,
    getGroups,
    grupsUser,
    getGroupExpenses,
    groupExpenses,
    groupName,
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
