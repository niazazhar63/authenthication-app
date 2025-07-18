import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  if (loading) return <p>Loading...</p>;

  if (user && user.email === adminEmail) {
    return children;
  }

  return <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
