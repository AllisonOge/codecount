import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { createProject as createProjectApi } from "../../services/apiProjects";
import { getCurrentUser } from "../../services/apiAuth";

export function useCreateProject() {
    const queryClient = useQueryClient();
    const { mutate: createProject, isLoading: isCreating } = useMutation({
        mutationFn: async (d) => {
            const user = queryClient.getQueryData("user") || await getCurrentUser();
            if (!user) {
                throw new Error("User is not logged in");
            }
            console.log(user)
            await createProjectApi({ ...d, owner: user.id })
        },
        onSuccess: () => {
            toast.success("Project created successfully")
            queryClient.invalidateQueries({
                queryKey: ["projects"]
            })
        },
        onError: (err) => {
            console.log(err)
            toast.error(err.message)
        }

    });
    return { createProject, isCreating }
}
