import { createContext, useContext, useState } from "react";
import {
  getGroupExpensesRequest,
  getGroupsRequest,
  getUsersByCreatorIdRequest,
  postCheckUserInGroupRequest,
} from "../services/groups";

export const GroupsContext = createContext({
  loading: true,
  setLoading: () => {},
  getGroups: () => {},
  groupsUser: {},
  getGroupExpenses: () => {},
  groupExpenses: {},
  groupName: "",
  totalExpenses: 0,
  averageExpense: 0,
  userDetails: {},
  message: [],
  postCheckUserInGroup: () => {},
  userWithPermission: false,
  getUsersByCreatorId: () => {},
  usersByCreatorId: {},
  createdGroups: [],
});

export const useGroups = () => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const GroupsProvider = ({ children }: any) => {
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

  const getGroups = async (userId: string) => {
    const res = await getGroupsRequest(userId);
    if (!res.error) {
      setGroupsUser(res.groups);
      const userCreatedGroups = res.groups.filter(
        (group) => group.creator_user_id === userId
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
  };

  return (
    <GroupsContext.Provider value={contextValue}>
      {children}
    </GroupsContext.Provider>
  );
};
