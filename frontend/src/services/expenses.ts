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