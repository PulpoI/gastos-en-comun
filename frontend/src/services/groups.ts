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

export const postCheckUserInGroupRequest = async (userId: string, groupId: string) => {
  try {
    const response = fetch(API + "check_user_in_group", {
      method: "POST",
      body: JSON.stringify({ userId, groupId }),
    });
    const data = (await response).json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export const getUsersByCreatorIdRequest = async (creatorId: string) => {
  try {
    const response = fetch(API + "get_users_by_creator_id&creatorId=" + creatorId, {
      method: "GET",
    });
    const data = (await response).json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export const postUserRegisteredInGroupRequest = async (values: object) => {
  try {
    const response = fetch(API + "add_user_to_group", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = (await response).json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export const postUserUnregisteredInGroupRequest = async (values: object) => {
  try {
    const response = fetch(API + "add_unregistered_user_to_group", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = (await response).json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export const postUnregisteredUserRequest = async (values: object) => {
  try {
    const response = fetch(API + "add_unregistered_user", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = (await response).json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export const postGroupRequest = async (values: object) => {
  try {
    const response = fetch(API + "create_group", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = (await response).json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}