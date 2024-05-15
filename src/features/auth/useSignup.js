/**
 * @module auth/useSignup
 * @description A hook that provides the signup function.
 */
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-hot-toast';
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

/**
 * useSignup is a hook that provides the signup function.
 * @returns {Object} - The signup function and a boolean indicating if the signup is loading.
 */
export function useSignup() {
    const navigate = useNavigate()

    const { mutate: signup, isLoading } = useMutation({
        mutationFn: ({ email, password }) => signupApi({ email, password }),
        onSuccess: () => {
            navigate("/dashboard")
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { signup, isLoading }
}
