/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ProtectedRoute.tsx
import { useUser } from "@/contexts/userContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: any;
  requiredRole?: "ADMIN" | "USER";
}) => {
  const { userProfile } = useUser();

  if (!userProfile) return <Navigate to="/login" replace />;

  if (requiredRole && userProfile.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
