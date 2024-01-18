import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  logoutRequest,
  signupRequest,
  verifyTokenRequest,
} from "../services/auth";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const AuthContext = createContext({
  signup: () => {},
  login: () => {},
  logout: () => {},
  errors: {},
  isAuthenticated: false,
  user: "",
  loading: true,
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
  const [loading, setLoading] = useState<boolean>(true);

  function setCookie(name: string, value: string, expires: number) {
    Cookies.set(name, value, { expires: expires });
  }

  const signup = async (user: { email: string }) => {
    const res = await signupRequest(user);
    if (!res.error) {
      login(res.user);
    } else {
      setErrors(res.error);
    }
  };

  const login = async (user: { email: string; password: string }) => {
    const res = await loginRequest(user);
    if (!res.error) {
      setUser(res.user.id_user);
      setIsAuthenticated(true);
      setCookie("gc_user", res.user.id_user, 365);
      setCookie("gc_token", res.token, 365);
      setErrors(res.message);
      toast.success(`Bienvenido/a ${res.user.name}`);
    } else {
      setErrors(res.error);
      toast.error(res.error);
    }
  };

  async function checkLogin() {
    const cookies = Cookies.get();
    if (cookies.gc_token && cookies.gc_user) {
      const res = await verifyTokenRequest(cookies.gc_token, cookies.gc_user);
      if (!res.error) {
        setUser(cookies.gc_user);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setErrors(res.error);
      }
    }
  }

  const logout = async () => {
    const cookies = Cookies.get();
    const res = await logoutRequest(cookies.gc_token);
    if (!res.error) {
      Cookies.remove("gc_user");
      Cookies.remove("gc_token");
      setUser(null);
      setIsAuthenticated(false);
      toast.info("Se ha cerrado la sesión");
    } else {
      setErrors(res.error);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const contextValue = {
    signup,
    login,
    logout,
    errors,
    user,
    isAuthenticated,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
