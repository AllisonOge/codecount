import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/auth/useUser";

export default function ProtectedRoute({ children }) {
  // 1. load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  const navigate = useNavigate(); // only call within a callback or useEffect

  // 2. If there is no authenticated user, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login", { replace: true });
  }, [isAuthenticated, isLoading, navigate]);

  // 3. while loading, show a spinner
  if (isLoading) return <p>Loading app</p>;

  // 4. if ther is a user render the app
  if (isAuthenticated) return children;

  return null;
}
