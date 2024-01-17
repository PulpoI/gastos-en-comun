import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, signupRequest, verifyToken } from "../services/auth";
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

  function setCookie(name: string, value: string, expires: number) {
    Cookies.set(name, value, { expires: expires });
  }

  const signup = async (user: { email: string }) => {
    const res = await signupRequest(user);
    if (!res.error) {
      setUser(res.user.id_user);
      setIsAuthenticated(true);
      setCookie("gc_user", res.user.user.id, 365);
      setCookie("gc_token", res.token, 365);
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
      setCookie("gc_user", res.user, 365);
      setCookie("gc_token", res.token, 365);
      setErrors(res.message);
    } else {
      setErrors(res.error);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (cookies.gc_token && cookies.gc_user) {
        const res = await verifyToken(cookies.gc_token, cookies.gc_user);
        if (!res.error) {
          setUser(cookies.gc_user);
          setIsAuthenticated(true);
        } else {
          setErrors(res.error);
        }
      }
    }
    checkLogin();
  }, []);

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
