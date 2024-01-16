import { createContext, useContext, useState } from "react";
import { signupRequest } from "../services/auth";

export const AuthContext = createContext({
  signup: () => {},
  errors: {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: any) => {
  const [errors, setErrors] = useState({});

  const signup = async (user: object) => {
    const res = await signupRequest(user);
    console.log(res);
  };

  const contextValue = {
    signup,
    errors,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
