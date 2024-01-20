import { API } from "./apirest";

export const getGroupsRequest = async (userId: string) => {
  try {
    const response = fetch(API + "get_groups_by_user_id&userId=" + userId, {
      method: "GET",
    });
    const data = (await response).json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export const getGroupExpensesRequest = async (groupId: string) => {
  try {
    const response = fetch(API + "get_group_expenses&groupId=" + groupId, {
      method: "GET",
    });
    const data = (await response).json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}