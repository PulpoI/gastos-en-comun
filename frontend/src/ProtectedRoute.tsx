import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Loading from "./components/Loading";
import { useState } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  setTimeout(() => {
    setLoading(false);
  }, 300);
  return (
    <>
      {loading && <Loading type={"groups"} />}
      {isAuthenticated && !loading && <Outlet />}
      {!isAuthenticated && !loading && <Navigate to="/login" />}
    </>
  );
};

export default ProtectedRoute;
