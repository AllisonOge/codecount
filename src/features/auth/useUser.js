/**
 * @module auth/useUser
 * @description A hook that provides the user object.
 */
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

/**
 * useUser is a hook that provides the user object.
 * @returns {Object} - The user object and a boolean indicating if the user is authenticated.
 */
export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
