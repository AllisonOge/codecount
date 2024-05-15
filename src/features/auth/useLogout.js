/**
 * @module auth/useLogout
 * @description A hook that provides the logout function.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

/**
 * useLogout is a hook that provides the logout function.
* @returns {Object} - The logout function and a boolean indicating if the logout is loading.
 */
export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", { replace: true })
        }
    })

    return { logout, isLoading }
}
