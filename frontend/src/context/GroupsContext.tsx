import { createContext, useContext, useState } from "react";
import {
  getGroupExpensesRequest,
  getGroupsRequest,
  getUsersByCreatorIdRequest,
  postCheckUserInGroupRequest,
} from "../services/groups";
import { getHistoryExpensesRequest } from "../services/expenses";

interface GroupsContextValue {
  getGroups: (e: string) => void;
  groupsUser: object | null;
  getGroupExpenses: (e: string) => void;
  groupExpenses: object | null;
  groupUser: string;
  totalExpenses: number;
  averageExpense: number;
  userDetails: any;
  message: any;
  postCheckUserInGroup: (e: string, f: string) => void;
  userWithPermission: boolean;
  getUsersByCreatorId: (e: string) => void;
  usersByCreatorId: any;
  createdGroups: any;
  getHistoryExpenses: (e: string) => void;
  historyExpenses: any;
}

export const GroupsContext = createContext<GroupsContextValue>({
  getGroups: () => {},
  groupsUser: null,
  getGroupExpenses: () => {},
  groupExpenses: null,
  groupUser: "",
  totalExpenses: 0,
  averageExpense: 0,
  userDetails: null,
  message: [],
  postCheckUserInGroup: () => {},
  userWithPermission: false,
  getUsersByCreatorId: () => {},
  usersByCreatorId: null,
  createdGroups: [],
  getHistoryExpenses: () => {},
  historyExpenses: [],
});

export const useGroups = () => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface GroupsProviderProps {
  children: React.ReactNode;
}

export const GroupsProvider = ({ children }: GroupsProviderProps) => {
  const [groupsUser, setGroupsUser] = useState<object | null>(null);
  const [groupExpenses, setGroupExpenses] = useState<object | null>(null);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [averageExpense, setAverageExpense] = useState<number>(0);
  const [userDetails, setUserDetails] = useState<object | null>(null);
  const [message, setMessage] = useState([]);
  const [groupUser, setGroupUser] = useState<string>("");
  const [userWithPermission, setUserWithPermission] = useState<boolean>(false);
  const [usersByCreatorId, setUsersByCreatorId] = useState<object | null>(null);
  const [createdGroups, setCreatedGroups] = useState([]);
  const [historyExpenses, setHistoryExpenses] = useState([]);

  const getGroups = async (userId: string) => {
    const res = await getGroupsRequest(userId);
    if (!res.error) {
      setGroupsUser(res.groups);
      const userCreatedGroups = res.groups.filter(
        (group: any) => group.creator_user_id === userId
      );
      setCreatedGroups(userCreatedGroups);
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
      setGroupUser(res.group);
    }
  };

  const postCheckUserInGroup = async (userId: string, groupId: string) => {
    getGroupExpenses(groupId);
    const res = await postCheckUserInGroupRequest(userId, groupId);
    if (!res.error) {
      setUserWithPermission(res);
    } else {
      setUserWithPermission(res);
    }
  };

  const getUsersByCreatorId = async (userId: string) => {
    const res = await getUsersByCreatorIdRequest(userId);
    if (!res.error) {
      setUsersByCreatorId(res.users);
    }
  };

  const getHistoryExpenses = async (groupId: string) => {
    const res = await getHistoryExpensesRequest(groupId);
    if (!res.error) {
      setHistoryExpenses(res.historyExpenses);
    }
  };

  const contextValue = {
    getGroups,
    groupsUser,
    getGroupExpenses,
    groupExpenses,
    groupUser,
    totalExpenses,
    averageExpense,
    userDetails,
    message,
    postCheckUserInGroup,
    userWithPermission,
    getUsersByCreatorId,
    usersByCreatorId,
    createdGroups,
    getHistoryExpenses,
    historyExpenses,
  };

  return (
    <GroupsContext.Provider value={contextValue}>
      {children}
    </GroupsContext.Provider>
  );
};
