// Create this in src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth && auth.isAuthenticated;

  // If logged in → show component
  // If NOT logged in → redirect to dashboard
  return isAuthenticated ? element : <Navigate to="/dashboard" />;
};

export default ProtectedRoute;