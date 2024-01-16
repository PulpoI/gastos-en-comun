import { API } from "./apirest";

export const signupRequest = async (user: object) => {
  try {
    const response = fetch(API + "register_user", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = (await response).json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
