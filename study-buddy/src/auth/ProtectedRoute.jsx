import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import { Navigate } from "react-router";
export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
}
