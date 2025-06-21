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
  const { userProfile, isLoading } = useUser();
  console.log("userProfile:", userProfile, "loading", isLoading);

  if (!userProfile && !isLoading) return <Navigate to="/auth" replace />;

  if (requiredRole && userProfile && userProfile.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
