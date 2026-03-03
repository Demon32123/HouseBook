import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";
import { BookOpen, Loader2 } from "lucide-react";

export function GuestLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-background gap-4"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
