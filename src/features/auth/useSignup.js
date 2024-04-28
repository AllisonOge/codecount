import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-hot-toast';
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

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
