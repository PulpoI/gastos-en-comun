import { API } from "./apirest";


export const postExpenseRequest = async (expense: object) => {
  try {
    const response = fetch(API + "add_common_expense", {
      method: "POST",
      body: JSON.stringify(expense),
    });
    const data = (await response).json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export const deleteExpenseRequest = async (expense: object) => {
  try {
    const response = await fetch(API + "delete_common_expense", {
      method: "DELETE",
      body: JSON.stringify(expense),
    })
    const data = await response.json();
    return data;

  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export const postGenerateHistoryExpensesRequest = async (groupId: string, userIdGenerated: string) => {
  try {
    const response =  await fetch(API + "generate_history_expenses", {
      method: "POST",
      body: JSON.stringify({groupId: groupId, userIdGenerated: userIdGenerated}),
    })
    const data = response.json();
    return data;

  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export const getHistoryExpensesRequest = async (groupId: string) => {
  try {
    const response = await fetch(API + "get_history_expenses&groupId=" + groupId, {
      method: "GET",
    })
    const data = await response.json();
    return data;

  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}