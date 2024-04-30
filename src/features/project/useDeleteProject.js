import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject as deleteProjectApi } from "../../services/apiProjects";
import toast from "react-hot-toast";

export function useDeleteProject(id) {
    const queryClient = useQueryClient()
    const { mutate: deleteProject, isLoading: isDeleting } = useMutation({
        mutationFn: deleteProjectApi,
        onSuccess: () => {
            toast.success("Project deleted successfully")
            queryClient.invalidateQueries(["projects", id])
        },
        onError: err => toast.error(err.message)
    })

    return { deleteProject, isDeleting }
}