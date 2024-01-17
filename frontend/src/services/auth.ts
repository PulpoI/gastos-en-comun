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

export const loginRequest = async (user: object) => {
  try {
    const response = fetch(API + "login_user", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = (await response).json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const verifyToken = async (token: string, userId: string) => {
  try {
    const response = fetch(API + "verify_token", {
      method: "POST",
      body: JSON.stringify({ token, userId }),
    });
    const data = (await response).json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const logoutRequest = async (token: string) => {
  try {
    const response = fetch(API + "logout_user", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
    const data = (await response).json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

