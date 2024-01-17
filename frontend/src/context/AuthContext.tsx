import { createContext, useContext, useState } from "react";
import { loginRequest, signupRequest } from "../services/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext({
  signup: () => {},
  login: () => {},
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
  const [user, setUser] = useState<object | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState({});

  const signup = async (user: { email: string }) => {
    const res = await signupRequest(user);
    if (!res.error) {
      setUser(user);
      setIsAuthenticated(true);
      Cookies.set("gastos-compartidos", user.email, { expires: 365 });
      setErrors(res.message);
    } else {
      setErrors(res.error);
    }
  };

  const login = async (user: { email: string; password: string }) => {
    const res = await loginRequest(user);
    if (!res.error) {
      setUser(res.user.id_user);
      setIsAuthenticated(true);
      Cookies.set("gc-userid", res.user.id_user, { expires: 365 });
      setErrors(res.message);
    } else {
      setErrors(res.error);
    }
  };

  const contextValue = {
    signup,
    login,
    errors,
    user,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
